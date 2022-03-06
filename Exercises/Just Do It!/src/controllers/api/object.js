/**
 * API - Non-specific object
 */

import { getConnection } from "typeorm";

const checkUnwantedProperties = (req) => {
  // Define unwanted properties
  const validProperties = ["id", "name", "done", "completed"],
    // Filter out unwanted properties
    unwantedProperties = Object.getOwnPropertyNames(req.body).filter(
      (prop) => !validProperties.includes(prop)
    );

  // If any unwanted properties exist throw error
  if (unwantedProperties.length > 0)
    throw new Error(
      `You requested unwanted properties: ${unwantedProperties.join(", ")}`
    );
};

export const postObject = async (entityName, relations, req, res, next) => {
  try {
    const entity = entityName.toLowerCase();

    const repository = getConnection().getRepository("Task");

    const newTask = await repository.save({
      name: req.body.name,
      categories: req.params.categoryId,
    });

    res.status(201).json({
      status: `Posted ${entity} with id: ${newTask.id}.`,
      data: newTask,
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
