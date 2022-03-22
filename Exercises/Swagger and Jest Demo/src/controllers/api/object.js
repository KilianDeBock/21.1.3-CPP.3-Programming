/**
 * The API controllers
 */
const {createConnection, getConnection} = typeorm;
import typeorm from 'typeorm';

export const deleteObject = async (entityName, req, res, next) => {
  try {
    // sets the name for output
    const readableEntityName = entityName.toLowerCase();

    // catching the id from params
    const {id} = req.params;

    // validate incoming variables
    if (!id) {
      throw new Error('Please specify an id to remove.');
    }

    // get the repository
    const repository = getConnection().getRepository(entityName);

    // check if the id exists
    const object = await repository.findOne({id});

    // validate and send error
    if (!object) throw new Error(`The ${readableEntityName} with id ${id} does not exist.`);

    // remove the object
    await repository.remove({id});

    // send a success message
    res.status(200).json({status: `Deleted ${readableEntityName} with id ${id}.`});
  } catch (e) {
    next(e.message);
  }
};

export const updateObject = async (entityName, req, res, next) => {
  try {
    // sets the name for output
    const readableEntityName = entityName.toLowerCase();

    // validate incoming data
    if (!req.body.id) throw new Error(`Please provide an id for the ${readableEntityName} you want to update.`);

    // get the repository
    const repository = getConnection().getRepository(entityName);

    // check if the object already exists
    const object = await repository.findOne({
      where: {id: req.body.id}
    });

    // check for duplicates
    if (!object) throw new Error(`The given ${readableEntityName} does not exist.`);

    // update the object
    await repository.save({...object, ...req.body});

    // send a success message
    res.status(200).json({status: `Updated ${readableEntityName} with id ${req.body.id}.`});
  } catch (e) {
    next(e.message);
  }
};

export const getObjects = async (entityName, req, res, next) => {
  try {
    // get the repository
    const repository = getConnection().getRepository(entityName);

    // get the objects and return them with status code 200
    res.status(200).json(await repository.find());
  } catch (e) {
    next(e.message);
  }
};

export const getObject = async (entityName, req, res, next) => {
  try {
    // get the repository
    const repository = getConnection().getRepository(entityName);

    // get the objects and return them with status code 200
    res.status(200).json(await repository.findOne({where: {id: req.params?.id}}));
  } catch (e) {
    next(e.message);
  }
};

export const postObject = async (entityName, req, res, next) => {
  try {
    // sets the name for output
    const readableEntityName = entityName.toLowerCase();

    // get the repository
    const repository = getConnection().getRepository(entityName);

    // insert the object
    const insertedObject = await repository.insert(req.body);

    // send a status code
    res.status(200).json({status: `Inserted ${readableEntityName} with id ${insertedObject.identifiers[0].id}.`});
  } catch (e) {
    next(e.message);
  }
};

