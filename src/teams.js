// 2026 Pot of Gold — Round 1 tee sheet (Sat Oct 3, Greystone) paired 1+2 / 3+4 per group.
// Handicap Index from the final player roster (Oct 1); tee code from the Round 1 tee sheet.
// Assumed pairings for the two late roster changes: Eric Gallant with Colin Decunha (group 4A),
// Mike Kluge replacing Paul Nalli with Jiten Waghela (group 9B). Edit on the board if different.
(function (root) {
  var P = function (name, index, tee) { return { name: name, index: index, tee: tee || 'GRY', adj: 0 }; };
  var ROSTER_VERSION = '2026-10-01 final';
  var TEAMS = [
    { id: 't01', group: '1A', players: [P('Quinn Kerr', 1.0, 'BL'), P('Jamie Janjevich', 10.3)] },
    { id: 't02', group: '1A', players: [P('Jeff Smith', 6.4), P('Tyson MacLean', 14.4)] },
    { id: 't03', group: '1B', players: [P('Greg Lewis', 1.2, 'BL'), P('Mirco Durante', 13.4)] },
    { id: 't04', group: '1B', players: [P('Scott Joyce', 9.6), P('Brian Murray', 13.5)] },
    { id: 't05', group: '2',  players: [P('Alex Durante', 9.5), P('Bill Gray', 10.1)] },
    { id: 't06', group: '2',  players: [P('Jeremy Nguyen', 8.9), P('Scott Dawkins', 24.6)] },
    { id: 't07', group: '3',  players: [P('Scott Gamble', 6.7), P('Hugh McMaster', 17.5, 'WHT')] },
    { id: 't08', group: '3',  players: [P('Ryan Kay', 7.3), P('Mark Bertoia', 16.1, 'WHT')] },
    { id: 't09', group: '4A', players: [P('Tim McDonald', 11.0), P('Jay Littlejohn', 10.1)] },
    { id: 't10', group: '4A', players: [P('Colin Decunha', 14.7, 'GRN'), P('Eric Gallant', 5.8)] },
    { id: 't11', group: '4B', players: [P('Mark Ollerenshaw', 12.5), P('Dave Kelly', 10.0)] },
    { id: 't12', group: '4B', players: [P('Graham Koshurba', 9.6), P('Trevor Riebot', 12.1)] },
    { id: 't13', group: '5A', players: [P('Shawn Holloway', 7.3), P('Cory Raymond', 17.2)] },
    { id: 't14', group: '5A', players: [P('Rick Warren', 5.8), P('Nick Lambevski', 17.0, 'WHT')] },
    { id: 't15', group: '5B', players: [P('Jonathan Goodman', 5.3), P('Fraser Plant', 14.4, 'WHT')] },
    { id: 't16', group: '5B', players: [P('Michael Sousa', 7.8), P('Charles Cartwright', 14.2, 'WHT')] },
    { id: 't17', group: '6',  players: [P('Rob Kunka', 6.6), P('Ryan Stevens', 13.2)], mine: true },
    { id: 't18', group: '6',  players: [P('Daniel Rust', 5.7), P('Rohit Mehra', 16.6, 'WHT')] },
    { id: 't19', group: '7',  players: [P('Peter Blazevic', -2.7, 'BL'), P('Ed Loeprich', 12.6, 'WHT')] },
    { id: 't20', group: '7',  players: [P('Steve Scannell', 9.4), P('Stephen Mangotich', 17.4, 'WHT')] },
    { id: 't21', group: '8A', players: [P('Peter White', 3.0), P('Jonathan Riding', 14.5)] },
    { id: 't22', group: '8A', players: [P('Chris Gerrie', 1.0, 'BL'), P('Henry Brinke', 19.0, 'WHT')] },
    { id: 't23', group: '8B', players: [P("Corey O'Sullivan", 9.5), P('Bob Roselle', 22.1)] },
    { id: 't24', group: '8B', players: [P('Daryl Brinke', 4.0, 'BL'), P('Andrew Grunda', 13.3)] },
    { id: 't25', group: '9A', players: [P('Alex Abramov', 6.5), P('Arjun Chowdhury', 17.9)] },
    { id: 't26', group: '9A', players: [P('Trevor Ash', 14.1), P('Trevor Wasney', 10.2)] },
    { id: 't27', group: '9B', players: [P('Jiten Waghela', 5.5), P('Mike Kluge', 9.9)] },
    { id: 't28', group: '9B', players: [P('Vince Enright', 4.0), P('Isaiah Sarkissian', 16.7)] },
    { id: 't29', group: '10A', players: [P('Michael Alderman', 1.8), P('Frank Risi', 12.5)] },
    { id: 't30', group: '10A', players: [P('James Drew', 7.6), P('Paulo Vieira', 23.0)] },
    { id: 't31', group: '10B', players: [P('Al Dairou', 3.9), P('David Buchanan', 10.6, 'WHT')] },
    { id: 't32', group: '10B', players: [P('Matt Robinson', -1.2, 'BL'), P('Mike Smith', 11.1, 'WHT')] }
  ];
  TEAMS.version = ROSTER_VERSION;
  if (typeof module !== 'undefined' && module.exports) module.exports = TEAMS;
  else root.POT_TEAMS = TEAMS;
})(typeof window !== 'undefined' ? window : this);
