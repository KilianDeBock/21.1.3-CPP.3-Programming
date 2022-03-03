/**
 * API -
 */
import { getConnection } from "typeorm";

export const postObject = async (entityName, req, res, next) => {
  try {
    if (!req.body.name) throw new Error("Please provide a name.");

    const repository = getConnection().getRepository(entityName);
    const repositoryInterests = getConnection().getRepository("Interest");

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
      ...req.body,
      interests: await repositoryInterests.find(),
      user_meta: {
        address: "Mariakerke",
        zipCode: "9030",
        city: "Ghent",
      },
      photos: [
        { filename: "Photo 1" },
        { filename: "Photo 2" },
        { filename: "Photo 3" },
      ],
    });

    res.status(201).json({
      status: `Posted item with id: ${insertedItem.id}`,
      data: insertedItem,
    });
  } catch (e) {
    next(e.message);
  }
};

export const getObject = async (entityName, req, res, next) => {
  try {
    const repository = getConnection().getRepository(entityName),
      item = await repository.find({ relations: ["user_meta", "interests"] });

    res.status(200).json(item);
  } catch (e) {
    next(e.message);
  }
};

export const deleteObject = async (entityName, req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("Please specify an id to remove");

    const repository = getConnection().getRepository(entityName);
    const item = await repository.findOne({ id });

    if (!item) throw new Error(`The item with id ${id} does not exist.`);

    await repository.remove({ id });

    res.status(202).json({ status: `Deleted item with id: ${id}` });
  } catch (e) {
    next(e.message);
  }
};

export const updateObject = async (entityName, req, res, next) => {
  try {
    if (!req.body.id)
      throw new Error("Please provide a id for the item you want to update.");

    const repository = getConnection().getRepository(entityName);
    const item = await repository.findOne({
      where: { id: req.body.id },
    });

    if (!item) throw new Error("The given item does not exist.");

    const updatedItem = {
      ...item,
      ...req.body,
    };

    await repository.save(updatedItem);

    res.status(202).json({ status: "Updated item.", data: updatedItem });
  } catch (e) {
    next(e.message);
  }
};
