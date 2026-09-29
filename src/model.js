// Pot of Gold — two-man net best-ball (net one-ball) Monte Carlo model.
// Runs in the browser (inline) and in node (for the strategy report).
// All handicap math follows the World Handicap System:
//   Course Handicap = round(Index * Slope/113 + (Rating - Par))
//   Playing Handicap = round(Course Handicap * Allowance)
(function (root) {
  'use strict';

  // Greystone Golf Club (Milton, ON), par 72. Ratings/slopes per public scorecard.
  var TEES = {
    BL:  { name: 'Blue',  rating: 72.1, slope: 140 },
    GRY: { name: 'Grey',  rating: 71.2, slope: 135 },
    WHT: { name: 'White', rating: 70.4, slope: 132 },
    GRN: { name: 'Green', rating: 69.2, slope: 130 }
  };
  var PAR = 72;

  // Stroke index assignment used for stroke allocation (odd SI on the front,
  // even on the back — the standard pattern). Only the pairing of strokes
  // between partners matters for the model, not the exact holes.
  var STROKE_INDEX = [1, 11, 3, 13, 5, 15, 7, 17, 9, 2, 12, 4, 14, 6, 16, 8, 18, 10];

  // Per-hole score-to-par distributions by course handicap (anchor rows).
  // Columns: eagle-, birdie, par, bogey, double, triple, quad+
  // Derived from shot-tracking population data (Arccos/Shot Scope style
  // distributions), tuned so the average round comes out ~2-6 strokes above
  // the handicap, as WHS "best 8 of 20" implies.
  var ANCHORS = [
    [-3, [0.010, 0.220, 0.620, 0.130, 0.020, 0.000, 0.000]],
    [ 0, [0.005, 0.160, 0.600, 0.195, 0.035, 0.005, 0.000]],
    [ 5, [0.002, 0.090, 0.500, 0.310, 0.078, 0.018, 0.002]],
    [10, [0.001, 0.050, 0.380, 0.380, 0.140, 0.040, 0.009]],
    [15, [0.000, 0.030, 0.270, 0.400, 0.210, 0.070, 0.020]],
    [20, [0.000, 0.020, 0.190, 0.360, 0.270, 0.110, 0.050]],
    [25, [0.000, 0.012, 0.130, 0.320, 0.290, 0.160, 0.088]],
    [30, [0.000, 0.008, 0.090, 0.270, 0.300, 0.190, 0.142]],
    [36, [0.000, 0.005, 0.060, 0.220, 0.300, 0.220, 0.195]]
  ];
  var SCORE_TO_PAR = [-2, -1, 0, 1, 2, 3, 4];

  function holeDist(h) {
    if (h <= ANCHORS[0][0]) return ANCHORS[0][1];
    var last = ANCHORS[ANCHORS.length - 1];
    if (h >= last[0]) return last[1];
    for (var i = 0; i < ANCHORS.length - 1; i++) {
      var a = ANCHORS[i], b = ANCHORS[i + 1];
      if (h >= a[0] && h <= b[0]) {
        var t = (h - a[0]) / (b[0] - a[0]);
        var out = [];
        for (var k = 0; k < 7; k++) out.push(a[1][k] + t * (b[1][k] - a[1][k]));
        return out;
      }
    }
    return last[1];
  }

  function cumulative(p) {
    var c = [], s = 0;
    for (var i = 0; i < p.length; i++) { s += p[i]; c.push(s); }
    c[c.length - 1] = 1.0001;
    return c;
  }

  function courseHandicap(index, teeCode) {
    var tee = TEES[teeCode] || TEES.GRY;
    return Math.round(index * tee.slope / 113 + (tee.rating - PAR));
  }

  // Strokes received per hole for a playing handicap (negative = plus).
  function strokesByHole(ph) {
    var s = new Array(18);
    for (var i = 0; i < 18; i++) {
      var si = STROKE_INDEX[i];
      if (ph >= 0) {
        s[i] = Math.floor(ph / 18) + (si <= (ph % 18) ? 1 : 0);
      } else {
        var give = -ph;
        s[i] = -(Math.floor(give / 18) + ((19 - si) <= (give % 18) ? 1 : 0));
      }
    }
    return s;
  }

  // Deterministic PRNG (mulberry32) so re-runs with the same inputs agree.
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function gauss(r) {
    var u = 1 - r(), v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  // teams: [{players:[{index, tee, adj}], ...}]
  // settings: {allowance (0-1), sims, rounds, payouts:[shares], seed}
  // Returns {teams:[{ch:[], ph:[], pWin, pMoney, posProb:[], evShare}], ranks: Uint8Array(sims*n), n, sims}
  function simulate(teams, settings) {
    var allowance = settings.allowance == null ? 1 : settings.allowance;
    var sims = settings.sims || 3000;
    var rounds = settings.rounds || 2;
    var payouts = settings.payouts || [0.45, 0.25, 0.15, 0.10, 0.05];
    var seed = settings.seed || 20261003;
    var r = rng(seed);
    var n = teams.length;

    // Precompute per player: playing handicap, stroke map, and per-round form sd.
    var prep = teams.map(function (t) {
      return t.players.map(function (p) {
        var idx = (p.index || 0) + (p.adj || 0);
        var ch = courseHandicap(idx, p.tee);
        var ph = Math.round(ch * allowance);
        return {
          ch: ch, ph: ph,
          strokes: strokesByHole(ph),
          formSd: 1.5 + 0.12 * Math.max(ch, 0),
          active: p.index != null && !isNaN(p.index)
        };
      });
    });

    var payShare = new Float64Array(n);   // expected share of pot, all positions
    var posProb = [];                      // posProb[i][k] = P(team i finishes in position k+1 (before ties))
    for (var i = 0; i < n; i++) posProb.push(new Float64Array(payouts.length));
    var ranks = new Uint8Array(sims * n);  // finishing position (1-based, ties share the lower number)
    var shares = new Float32Array(sims * n); // payout share per sim (ties split)
    var totals = new Float64Array(n);
    var order = new Array(n);

    for (var s = 0; s < sims; s++) {
      for (var i2 = 0; i2 < n; i2++) totals[i2] = 0;
      for (var ti = 0; ti < n; ti++) {
        var ps = prep[ti];
        var team = 0;
        for (var rd = 0; rd < rounds; rd++) {
          // Per-round form: shift each player's effective handicap.
          var dists = [], cums = [];
          for (var pi = 0; pi < ps.length; pi++) {
            var eff = ps[pi].ch + gauss(r) * ps[pi].formSd;
            cums.push(cumulative(holeDist(eff)));
          }
          for (var h = 0; h < 18; h++) {
            var best = 99;
            for (var pj = 0; pj < ps.length; pj++) {
              if (!ps[pj].active) continue;
              var u = r(), c = cums[pj], k = 0;
              while (u > c[k]) k++;
              var net = SCORE_TO_PAR[k] - ps[pj].strokes[h];
              if (net < best) best = net;
            }
            if (best === 99) best = 6; // nobody active: penalise
            team += best;
          }
        }
        totals[ti] = team;
      }
      // Rank (lower is better), split ties.
      for (var o = 0; o < n; o++) order[o] = o;
      order.sort(function (a, b) { return totals[a] - totals[b]; });
      var pos = 0;
      while (pos < n) {
        var end = pos;
        while (end + 1 < n && totals[order[end + 1]] === totals[order[pos]]) end++;
        var cnt = end - pos + 1, sumPay = 0;
        for (var q = pos; q <= end; q++) sumPay += (q < payouts.length ? payouts[q] : 0);
        var each = sumPay / cnt;
        for (var q2 = pos; q2 <= end; q2++) {
          var t2 = order[q2];
          ranks[s * n + t2] = pos + 1;
          shares[s * n + t2] = each;
          payShare[t2] += each;
          if (pos < payouts.length) posProb[t2][pos] += 1 / cnt;
        }
        pos = end + 1;
      }
    }

    var out = teams.map(function (t, i) {
      var pw = 0, pm = 0;
      for (var k = 0; k < payouts.length; k++) { posProb[i][k] /= sims; pm += posProb[i][k]; }
      pw = posProb[i][0];
      return {
        ch: prep[i].map(function (p) { return p.ch; }),
        ph: prep[i].map(function (p) { return p.ph; }),
        pWin: pw,
        pMoney: pm,
        posProb: Array.prototype.slice.call(posProb[i]),
        potShare: payShare[i] / sims   // expected fraction of the pot this team collects
      };
    });
    return { teams: out, ranks: ranks, shares: shares, n: n, sims: sims };
  }

  var api = { TEES: TEES, PAR: PAR, courseHandicap: courseHandicap, strokesByHole: strokesByHole, holeDist: holeDist, simulate: simulate };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PotModel = api;
})(typeof window !== 'undefined' ? window : this);
