# Pot of Gold — Calcutta auction board

Phone-first live board for the 2026 Pot of Gold two-man net best-ball Calcutta.

- `src/teams.js` — Round 1 pairings (1+2 / 3+4 per tee-sheet group) with handicap index and tee.
- `src/model.js` — Monte Carlo model of the two-day net one-ball format (WHS course handicaps, stroke allocation, per-hole scoring distributions, per-round form).
- `src/app.html` — the board UI: live bids, buybacks, reserves, budget tracking, fair value and caps, charts.
- `build.js` — inlines the scripts into `dist/pot-of-gold.html`, a single self-contained page.

```
node build.js
```
