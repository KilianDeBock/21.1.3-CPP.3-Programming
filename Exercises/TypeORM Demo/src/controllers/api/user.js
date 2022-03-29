/**
 * API - Non-specific object
 */

import { getConnection } from "typeorm";

const checkUnwantedProperties = (req) => {
  const validProperties = ["id", "firstname", "lastname"],
    unwantedProperties = Object.getOwnPropertyNames(req.body).filter(
      (prop) => !validProperties.includes(prop)
    );

  if (unwantedProperties.length > 0)
    throw new Error(
      `You requested unwanted properties: ${unwantedProperties.join(", ")}`
    );
};

export const postUser = async (req, res, next) => {
  try {
    if (!req.body.firstname) throw new Error("Enter a name!");

    checkUnwantedProperties(req);

    const repository = getConnection().getRepository("User");
    const interestRepository = getConnection().getRepository("Interest");

    const object = await repository.findOne({
      where: { firstname: req.body.firstname },
    });

    if (object) {
      return res.status(200).json({
        status: `Posted user with id: ${object.id}.`,
      });
    }

    const insertedEntityName = await repository.save({
      ...req.body,
      interests: await interestRepository.find(),
      user_meta: {
        address: "Mariakerke",
        zipCode: "9030",
        city: "Gent",
      },
      photos: [
        { filename: "photo1.png" },
        { filename: "photo2.png" },
        { filename: "photo3.png" },
      ],
    });

    res.status(201).json({
      status: `Posted user with id: ${insertedEntityName.id}.`,
      data: insertedEntityName,
    });
  } catch (e) {
    next(e.message);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const repository = getConnection().getRepository("User");

    res.status(200).json(
      await repository.find({
        relations: ["user_meta", "interests", "photos"],
      })
    );
  } catch (e) {
    next(e.message);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("Please specify an id to remove.");

    const repository = getConnection().getRepository("User");
    const object = await repository.findOne({ id });

    if (!object)
      throw new Error(`The given user with id ${id} does not exist.`);

    await repository.remove({ id });

    res.status(202).json({ status: `Deleted user with id ${id}` });
  } catch (e) {
    next(e.message);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    checkUnwantedProperties(req);

    if (!req.body.id)
      throw new Error(
        "Please provide a id for the interest you want to update."
      );

    const repository = getConnection().getRepository("User");

    const object = await repository.findOne({
      where: { id: req.body.id },
    });

    if (!object) throw new Error(`The given user does not exist.`);

    const updatedEntityName = { ..."User", ...req.body };

    await repository.save(updatedEntityName);

    res.status(202).json({
      status: `Updated user with id: ${req.body.id}`,
    });
  } catch (e) {
    next(e.message);
  }
};
