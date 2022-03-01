/**
 * A Home Controller
 */

export const home = (req, res) => {
  const menuItems = [
    {
      text: "Google",
      url: "https://google.be"
    },
    {
      text: "Facebook",
      url: "https://facebook.com"
    }
  ]

  const userData = {
    firstname: "Ada",
    lastname: "Lovelace",
    interests: [
      {
        name: "Mathematics"
      },
      {
        name: "Algorithms"
      },
      {
        name: "Computer Science"
      },
    ]
  };

  res.render('home', {
    menuItems,
    userData
  });
}