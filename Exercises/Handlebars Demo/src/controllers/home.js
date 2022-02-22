/**
 * A Home Controller
 */

export const home = (req, res) => {
  const primaryMenuItems = [
    {
      text: "Google",
      url: "https://google.com",
    },
    {
      text: "Facebook",
      url: "https://facebook.com",
    },
  ];
  const data = {
    isTrue: true,
    isFalse: false,
    numbers: [
      {number: 0},
      {number: 1},
      {number: 2},
      {number: 3},
      {number: 4},
      {number: 5},
      {number: 6},
      {number: 7},
      {number: 8},
      {number: 9}
    ],

    person: {
      firstname: "Kilian",
      lastname: "De Bock",
      isAGhost: false,
    },
    interests: [
      {name: "Theater"},
      {name: "Fietsen"},
      {name: "Development"},
    ],
  };
  res.render("home", {data, primaryMenuItems});
};
