// 2026 Pot of Gold — Round 1 tee sheet (Sat Oct 3, Greystone, issued Oct 2), paired 1+2 / 3+4 per group.
// Each player: name, Handicap Index, assigned tee, official strokes from the tee sheet
// (the first number in parentheses, already including the 85% allowance).
// The model uses the official strokes directly; index and tee set the player's scoring ability.
(function (root) {
  var P = function (name, index, tee, strokes) { return { name: name, index: index, tee: tee || 'GRY', strokes: strokes == null ? null : strokes, adj: 0 }; };
  var ROSTER_VERSION = '2026-10-02 tee sheet with official strokes';
  var TEAMS = [
    { id: 't01', group: '1A', players: [P('Quinn Kerr', 1.0, 'BL', 1), P('Jamie Janjevich', 10.3, 'GRY', 10)] },
    { id: 't02', group: '1A', players: [P('Jeff Smith', 6.4, 'GRY', 6), P('Tyson MacLean', 14.4, 'GRY', 14)] },
    { id: 't03', group: '1B', players: [P('Greg Lewis', 1.2, 'BL', 1), P('Mirco Durante', 13.4, 'GRY', 13)] },
    { id: 't04', group: '1B', players: [P('Scott Joyce', 9.6, 'GRY', 9), P('Brian Murray', 13.5, 'GRY', 13)] },
    { id: 't05', group: '2', players: [P('Alex Durante', 9.5, 'GRY', 9), P('Bill Gray', 10.1, 'WHT', 8)] },
    { id: 't06', group: '2', players: [P('Jeremy Nguyen', 8.9, 'GRY', 8), P('Scott Dawkins', 24.6, 'GRY', 24)] },
    { id: 't07', group: '3', players: [P('Scott Gamble', 6.7, 'GRY', 6), P('Hugh McMaster', 17.5, 'GRN', 14)] },
    { id: 't08', group: '3', players: [P('Ryan Kay', 7.3, 'GRY', 7), P('Mark Bertoia', 16.1, 'WHT', 14)] },
    { id: 't09', group: '4A', players: [P('Jake Scott', -3.5, 'GLD', -2), P('Tim McDonald', 11.0, 'GRY', 10)] },
    { id: 't10', group: '4A', players: [P('Jay Littlejohn', 10.1, 'WHT', 8), P('Colin Decunha', 14.7, 'GRN', 11)] },
    { id: 't11', group: '4B', players: [P('Mark Ollerenshaw', 12.5, 'GRY', 12), P('Dave Kelly', 10.0, 'GRY', 9)] },
    { id: 't12', group: '4B', players: [P('Graham Koshurba', 9.6, 'GRY', 9), P('Trevor Riebot', 12.1, 'GRY', 11)] },
    { id: 't13', group: '5A', players: [P('Shawn Holloway', 7.3, 'GRY', 7), P('Cory Raymond', 17.2, 'GRY', 16)] },
    { id: 't14', group: '5A', players: [P('Rick Warren', 5.8, 'GRY', 5), P('Nick Lambevski', 17.0, 'WHT', 15)] },
    { id: 't15', group: '5B', players: [P('Jonathan Goodman', 5.3, 'GRY', 5), P('Fraser Plant', 14.4, 'WHT', 12)] },
    { id: 't16', group: '5B', players: [P('Michael Sousa', 7.8, 'GRY', 7), P('Charles Cartwright', 14.2, 'WHT', 12)] },
    { id: 't17', group: '6', players: [P('Rob Kunka', 6.6, 'GRY', 6), P('Ryan Stevens', 13.2, 'GRY', 12)], mine: true },
    { id: 't18', group: '6', players: [P('Daniel Rust', 5.7, 'GRY', 5), P('Rohit Mehra', 16.6, 'WHT', 14)] },
    { id: 't19', group: '7', players: [P('Peter Blazevic', -2.7, 'BL', -3), P('Ed Loeprich', 12.6, 'WHT', 11)] },
    { id: 't20', group: '7', players: [P('Steve Scannell', 9.4, 'GRY', 9), P('Stephen Mangotich', 17.4, 'WHT', 15)] },
    { id: 't21', group: '8A', players: [P('Peter White', 3.0, 'GRY', 2), P('Jonathan Riding', 14.5, 'GRY', 14)] },
    { id: 't22', group: '8A', players: [P('Chris Gerrie', 1.0, 'BL', 1), P('Henry Brinke', 19.0, 'WHT', 17)] },
    { id: 't23', group: '8B', players: [P("Corey O'Sullivan", 9.5, 'GRY', 9), P('Bob Roselle', 22.1, 'GRY', 21)] },
    { id: 't24', group: '8B', players: [P('Daryl Brinke', 4.0, 'BL', 4), P('Andrew Grunda', 13.3, 'GRY', 13)] },
    { id: 't25', group: '9A', players: [P('Alex Abramov', 6.5, 'GRY', 6), P('Arjun Chowdhury', 17.9, 'GRY', 17)] },
    { id: 't26', group: '9A', players: [P('Trevor Ash', 14.1, 'GRY', 13), P('Trevor Wasney', 10.2, 'GRY', 9)] },
    { id: 't27', group: '9B', players: [P('Jiten Waghela', 5.5, 'GRY', 5), P('Mike Kluge', 9.9, 'GRY', 9)] },
    { id: 't28', group: '9B', players: [P('Vince Enright', 4.0, 'GRY', 3), P('Isaiah Sarkissian', 16.7, 'GRY', 16)] },
    { id: 't29', group: '10A', players: [P('Michael Alderman', 1.8, 'GRY', 1), P('Frank Risi', 12.5, 'WHT', 11)] },
    { id: 't30', group: '10A', players: [P('James Drew', 7.6, 'GRY', 7), P('Paulo Vieira', 23.0, 'GRY', 22)] },
    { id: 't31', group: '10B', players: [P('Al Dairou', 3.9, 'GRY', 3), P('David Buchanan', 10.6, 'WHT', 9)] },
    { id: 't32', group: '10B', players: [P('Matt Robinson', -1.2, 'BL', -1), P('Mike Smith', 11.1, 'WHT', 9)] }
  ];
  TEAMS.version = ROSTER_VERSION;
  if (typeof module !== 'undefined' && module.exports) module.exports = TEAMS;
  else root.POT_TEAMS = TEAMS;
})(typeof window !== 'undefined' ? window : this);
