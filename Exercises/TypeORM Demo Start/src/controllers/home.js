/**
 * A Home Controller
 */
import { getConnection } from "typeorm";

export const home = async (req, res) => {
  const navigationItemRepository =
      getConnection().getRepository("NavigationItem"),
    menuItems = await navigationItemRepository.find(),
    interestRepository = getConnection().getRepository("Interests"),
    interests = await interestRepository.find();

  console.log(menuItems);

  const userData = {
    firstname: "Pedro",
    lastname: "Yankin",
    interests: interests,
  };

  res.render("home", {
    menuItems,
    userData,
  });
};
