/**
 * A Home Controller
 */
import { getConnection } from "typeorm";

export const home = async (req, res) => {
  const navItemRepository = getConnection().getRepository("NavigationItem"),
    menuItems = await navItemRepository.find(),
    userRepository = getConnection().getRepository("User"),
    userData = await userRepository.findOne({
      where: { id: 2 },
      relations: ["interests"],
    });

  res.render("home", {
    menuItems,
    userData,
  });
};

export const homePostInterest = async (req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.userId) throw new Error("Please provide a USER ID");
    if (!req.body.name) throw new Error("Please provide an interest");

    // get the repositories
    const userRepository = getConnection().getRepository("User");
    const interestRepository = getConnection().getRepository("Interest");

    // Search if user is same as userId
    const user = await userRepository.findOneOrFail({
      where: { id: parseInt(req.body.userId) },
      relations: ["interests"],
    });

    // Search if interest already exists
    let interest = await interestRepository.findOne({
      where: { name: req.body.name },
    });

    // If interest does not exists
    if (!interest) {
      interest = await interestRepository.save({ name: req.body.name });
    }
    const hasInterest =
      user.interests.filter((interest) => interest.name === req.body.name)
        .length > 0;

    // If there's no interest
    if (!hasInterest) {
      user.interests.push(interest);
      await userRepository.save(user);
    }

    // Render homepage again
    res.redirect("/");
  } catch (e) {
    next(e.message);
  }
};
