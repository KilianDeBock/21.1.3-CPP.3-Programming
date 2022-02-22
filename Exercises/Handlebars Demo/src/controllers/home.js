/**
 * A Home Controller
 */

export const home = (req, res) => {
  const person = {
    data: {
      firstname: "Kilian",
      lastname: "De Bock",
    },
  };
  res.render("home", person);
};
