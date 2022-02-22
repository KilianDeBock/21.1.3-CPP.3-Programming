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
    person: {
      firstname: "Kilian",
      lastname: "De Bock",
    },
    interests: [
      { name: "Theater" },
      { name: "Fietsen" },
      { name: "Development" },
    ],
  };
  res.render("home", { data, primaryMenuItems });
};
