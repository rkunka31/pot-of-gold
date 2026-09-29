# Pot of Gold — Calcutta auction board

Phone-first live board for the 2026 Pot of Gold two-man net best-ball Calcutta.

Event rules built in: two-man one net best, 85% handicap allowance, Calcutta scored on the Sunday round only, top 5 owners plus ties paid. Sealed reserve: if the hammer lands below a team's reserve the team keeps 100% at hammer plus $50; otherwise the winner must offer the team a 50% stake. Whether the team's 50% money goes into the pot or back to the winner is a setting.

To load final handicaps: update `src/teams.js` (bump `ROSTER_VERSION`), run `node build.js`, republish. The board replaces names, indexes and tees from the new roster and keeps every auction entry and adjustment.

- `src/teams.js` — Round 1 pairings (1+2 / 3+4 per tee-sheet group) with handicap index and tee.
- `src/model.js` — Monte Carlo model of the two-day net one-ball format (WHS course handicaps, stroke allocation, per-hole scoring distributions, per-round form).
- `src/app.html` — the board UI: live bids, buybacks, reserves, budget tracking, fair value and caps, charts.
- `build.js` — inlines the scripts into `dist/pot-of-gold.html`, a single self-contained page.

```
node build.js
```
