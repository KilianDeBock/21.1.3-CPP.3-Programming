/**
 * A Home Controller
 */
import { getConnection } from "typeorm";

export const home = async (req, res) => {
  const navigationItemRepository =
      getConnection().getRepository("NavigationItem"),
    menuItems = await navigationItemRepository.find();

  console.log(menuItems);

  const userData = {
    firstname: "Pedro",
    lastname: "Yankin",
    interests: [
      {
        name: "Mathematics",
      },
      {
        name: "Algorithms",
      },
      {
        name: "Computer Science",
      },
    ],
  };

  res.render("home", {
    menuItems,
    userData,
  });
};
