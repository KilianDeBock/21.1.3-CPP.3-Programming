/**
 * User API
 */

import {getConnection} from 'typeorm';

const checkUnwantedProperties = (req) => {
  const validProperties = ['id', 'firstname', 'lastname'],
    unwantedProperties = Object.getOwnPropertyNames(req.body).filter(
      (prop) => !validProperties.includes(prop)
    );

  if (unwantedProperties.length > 0)
    throw new Error(
      `You requested unwanted properties: ${unwantedProperties.join(', ')}`
    );
};

export const postUser = async (req, res, next) => {
  try {
    if (!req.body.firstname) throw new Error('Enter a name!');

    checkUnwantedProperties(req);

    const repository = getConnection().getRepository('User');

    const object = await repository.findOne({
      where: {firstname: req.body.firstname},
    });

    if (object) {
      return res.status(200).json({
        status: `Posted user with id: ${object.id}.`,
      });
    }

    const insertedEntityName = await repository.save({
      ...req.body,
      categories: [
        {
          name: 'Welcome!',
          tasks: [
            {
              name: 'Welcome to my free open source todo app.',
              completed: false,
              tags: [
                {name: 'Heye!'},
              ]
            },
            {
              name: 'The tasks added are here to guide you!',
              completed: false,
              tags: [
                {name: 'Btw', order: 0},
                {name: 'these', order: 1},
                {name: 'are', order: 2},
                {name: 'tags!', order: 3},
              ]
            },
            {
              name: 'This task is completed!',
              completed: true,
              tags: [
                {name: 'And', order: 0},
                {name: 'it', order: 1},
                {name: 'keeps', order: 2},
                {name: 'tags!', order: 3},
              ]
            }
          ]
        }
      ]
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
    const repository = getConnection().getRepository('User');

    res.status(200).json(
      await repository.find({
        id: req.body.id,
        relations: ['categories', 'categories.tasks', 'categories.tasks.tags'],
      })
    );
  } catch (e) {
    next(e.message);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const {id} = req.params;

    if (!id) throw new Error('Please specify an id to remove.');

    const repository = getConnection().getRepository('User');
    const object = await repository.findOne({id});

    if (!object)
      throw new Error(`The given user with id ${id} does not exist.`);

    await repository.remove({id});

    res.status(202).json({status: `Deleted user with id ${id}`});
  } catch (e) {
    next(e.message);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    checkUnwantedProperties(req);

    if (!req.body.id)
      throw new Error(
        'Please provide a id for the interest you want to update.'
      );

    const repository = getConnection().getRepository('User');

    const object = await repository.findOne({
      where: {id: req.body.id},
    });

    if (!object) throw new Error(`The given user does not exist.`);

    const updatedEntityName = {...'User', ...req.body};

    await repository.save(updatedEntityName);

    res.status(202).json({
      status: `Updated user with id: ${req.body.id}`,
    });
  } catch (e) {
    next(e.message);
  }
};
