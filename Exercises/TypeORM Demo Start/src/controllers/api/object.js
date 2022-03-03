/**
 * API - Non-specific object
 */

import { getConnection } from "typeorm";

const checkUnwantedProperties = (req) => {
  // Define unwanted properties
  const validProperties = ["id", "name", "done"],
    // Filter out unwanted properties
    unwantedProperties = Object.getOwnPropertyNames(req.body).filter(
      (prop) => !validProperties.includes(prop)
    );

  // If any unwanted properties exist trow error
  if (unwantedProperties.length > 0)
    throw new Error(
      `You requested unwanted properties: ${unwantedProperties.join(", ")}`
    );
};

export const postObject = async (entityName, req, res, next) => {
  try {
    const entity = entityName.toLowerCase();

    if (!req.body.name) throw new Error("Enter a name!");

    checkUnwantedProperties(req);

    const repository = getConnection().getRepository(entityName);
    const interestRepository = getConnection().getRepository("Interest");

    const object = await repository.findOne({
      where: { name: req.body.name },
    });

    if (object) {
      return res.status(200).json({
        status: `Posted ${entity} with id: ${object.id}.`,
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
        { fileName: "photo1.png" },
        { fileName: "photo2.png" },
        { fileName: "photo3.png" },
      ],
    });

    res.status(201).json({
      status: `Posted ${entity} with id: ${insertedEntityName.id}.`,
      data: insertedEntityName,
    });
  } catch (e) {
    next(e.message);
  }
};

export const getObject = async (entityName, req, res, next) => {
  try {
    const repository = getConnection().getRepository(entityName);

    res.status(200).json(
      await repository.find({
        relations: ["user_meta", "interests", "photos"],
      })
    );
  } catch (e) {
    next(e.message);
  }
};

export const deleteObject = async (entityName, req, res, next) => {
  try {
    const entity = entityName.toLowerCase();

    const { id } = req.params;

    if (!id) throw new Error("Please specify an id to remove.");

    const repository = getConnection().getRepository(entityName);
    const object = await repository.findOne({ id });

    if (!object)
      throw new Error(`The given ${entity} with id ${id} does not exist.`);

    await repository.remove({ id });

    res.status(202).json({ status: `Deleted ${entity} with id ${id}` });
  } catch (e) {
    next(e.message);
  }
};

export const updateObject = async (entityName, req, res, next) => {
  try {
    const entity = entityName.toLowerCase();

    checkUnwantedProperties(req);

    if (!req.body.name)
      throw new Error(`Provide an id for the ${entity} you want to update`);

    const repository = getConnection().getRepository(entityName);

    const object = await repository.findOne({
      where: { id: req.body.id },
    });

    if (!object) throw new Error(`The given ${entity} does not exist.`);

    const updatedEntityName = { ...entityName, ...req.body };

    await repository.save(updatedEntityName);

    res.status(202).json({
      status: `Updated ${entity} with id: ${req.body.id}`,
    });
  } catch (e) {
    next(e.message);
  }
};
