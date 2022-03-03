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

export const homePostInterest = async (req, res, next) => {
  try {
    if (!req.body.name) throw new Error("Please provide a name.");

    const repository = getConnection().getRepository("Interest");
    0;

    const item = await repository.findOne({
      where: { name: req.body.name },
    });

    if (item) {
      return res.status(200).json({
        status: `Item already exists with id: ${item.id}`,
        data: item,
      });
    }

    const insertedItem = await repository.save({
      name: req.body.name,
    });

    res.status(201).json({
      status: `Posted item with id: ${insertedItem.id}`,
      data: insertedItem,
    });
  } catch (e) {
    next(e.message);
  }
};
