/**
 * API -
 */
import { getConnection } from "typeorm";

export const postUser = async (req, res, next) => {
  try {
    const userRepository = getConnection().getRepository("User");

    const insertedUser = await userRepository.save({
      ...req.body,
      user_meta: {
        address: "Mariakerke",
        zipCode: "9030",
        city: "Ghent",
      },
    });

    console.log(insertedUser);

    res.status(200).json({
      status: `Posted user with id: ${insertedUser.id}`,
      data: insertedUser,
    });
  } catch (e) {
    next(e.message);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userRepository = getConnection().getRepository("Users"),
      users = await userRepository.find();

    res.status(200).json(users);
  } catch (e) {
    next(e.message);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("Please specify an id to remove");

    const userRepository = getConnection().getRepository("User");

    const user = await userRepository.findOne({ id });

    if (!user) throw new Error(`The user with id ${id} does not exist.`);

    await userRepository.remove({ id });

    res.status(200).json({ status: `Deleted user with id: ${id}` });
  } catch (e) {
    next(e.message);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    if (!req.body.id)
      throw new Error(
        "Please provide a id for the intrest you want to update."
      );

    const userRepository = getConnection().getRepository("User");

    const user = await userRepository.findOne({
      where: { id: req.body.id },
    });

    if (!user) throw new Error("The given user does not exist.");

    const updatedUser = {
      ...user,
      id: req.id,
      name: req.name,
    };

    await userRepository.save(updatedUser);

    res.status(200).json({ status: "Updated user.", data: updatedUser });
  } catch (e) {
    next(e.message);
  }
};
