// 2026 Pot of Gold — Round 1 tee sheet (Sat Oct 3, Greystone) paired 1+2 / 3+4 per group.
// Handicap Index from the player roster; tee code from the tee sheet.
(function (root) {
  var P = function (name, index, tee) { return { name: name, index: index, tee: tee || 'GRY', adj: 0 }; };
  var TEAMS = [
    { id: 't01', group: '1A', players: [P('Quinn Kerr', 1.0, 'BL'), P('Jamie Janjevich', 10.3)] },
    { id: 't02', group: '1A', players: [P('Jeff Smith', 6.1), P('Tyson MacLean', 14.2)] },
    { id: 't03', group: '1B', players: [P('Greg Lewis', 1.2, 'BL'), P('Mirco Durante', 13.4)] },
    { id: 't04', group: '1B', players: [P('Scott Joyce', 9.4), P('Brian Murray', 14.0)] },
    { id: 't05', group: '2',  players: [P('Alex Durante', 9.5), P('Bill Gray', 10.1)] },
    { id: 't06', group: '2',  players: [P('Jeremy Nguyen', 8.7), P('Scott Dawkins', 24.9)] },
    { id: 't07', group: '3',  players: [P('Scott Gamble', 6.8), P('Hugh McMaster', 18.4, 'WHT')] },
    { id: 't08', group: '3',  players: [P('Ryan Kay', 7.3), P('Mark Bertoia', 16.1, 'WHT')] },
    { id: 't09', group: '4A', players: [P('Tim McDonald', 11.0), P('Jay Littlejohn', 10.1)] },
    { id: 't10', group: '4A', players: [P('Colin Decunha', 15.1, 'GRN'), P('Partner TBD', 14.0)] },
    { id: 't11', group: '4B', players: [P('Mark Ollerenshaw', 12.6), P('Dave Kelly', 10.0)] },
    { id: 't12', group: '4B', players: [P('Graham Koshurba', 9.6), P('Trevor Riebot', 12.3)] },
    { id: 't13', group: '5A', players: [P('Shawn Holloway', 7.4), P('Cory Raymond', 17.2)] },
    { id: 't14', group: '5A', players: [P('Rick Warren', 5.7), P('Nick Lambevski', 15.9, 'WHT')] },
    { id: 't15', group: '5B', players: [P('Jonathan Goodman', 5.2), P('Fraser Plant', 14.4, 'WHT')] },
    { id: 't16', group: '5B', players: [P('Michael Sousa', 7.8), P('Charles Cartwright', 14.2, 'WHT')] },
    { id: 't17', group: '6',  players: [P('Rob Kunka', 6.0), P('Ryan Stevens', 13.2)], mine: true },
    { id: 't18', group: '6',  players: [P('Daniel Rust', 5.8), P('Rohit Mehra', 16.5, 'WHT')] },
    { id: 't19', group: '7',  players: [P('Peter Blazevic', -2.7, 'BL'), P('Ed Loeprich', 12.6, 'WHT')] },
    { id: 't20', group: '7',  players: [P('Steve Scannell', 9.7), P('Stephen Mangotich', 17.4, 'WHT')] },
    { id: 't21', group: '8A', players: [P('Peter White', 3.0), P('Jonathan Riding', 14.5)] },
    { id: 't22', group: '8A', players: [P('Chris Gerrie', 1.0, 'BL'), P('Henry Brinke', 19.2, 'WHT')] },
    { id: 't23', group: '8B', players: [P("Corey O'Sullivan", 9.5), P('Bob Roselle', 22.1)] },
    { id: 't24', group: '8B', players: [P('Daryl Brinke', 4.0, 'BL'), P('Andrew Grunda', 13.6)] },
    { id: 't25', group: '9A', players: [P('Alex Abramov', 6.5), P('Arjun Chowdhury', 17.5)] },
    { id: 't26', group: '9A', players: [P('Trevor Ash', 14.1), P('Trevor Wasney', 9.9)] },
    { id: 't27', group: '9B', players: [P('Jiten Waghela', 5.5), P('Paul Nalli', 16.7)] },
    { id: 't28', group: '9B', players: [P('Vince Enright', 4.0), P('Isaiah Sarkissian', 16.5)] },
    { id: 't29', group: '10A', players: [P('Michael Alderman', 2.2), P('Frank Risi', 12.5)] },
    { id: 't30', group: '10A', players: [P('James Drew', 7.2), P('Paulo Vieira', 22.7)] },
    { id: 't31', group: '10B', players: [P('Al Dairou', 3.9), P('David Buchanan', 10.7, 'WHT')] },
    { id: 't32', group: '10B', players: [P('Matt Robinson', -1.2, 'BL'), P('Mike Smith', 11.2, 'WHT')] }
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = TEAMS;
  else root.POT_TEAMS = TEAMS;
})(typeof window !== 'undefined' ? window : this);
