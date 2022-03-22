/**
 * The API controllers
 */
const {createConnection, getConnection} = typeorm;
import typeorm from 'typeorm';

export const getUsers = async (req, res, next) => {
  try {
    // get the repository
    const userRepository = getConnection().getRepository('User');

    // get the interests and return them with status code 200
    res.status(200).json(await userRepository.find({relations: ['interests', 'user_meta', 'roles']}));
  } catch (e) {
    next(e.message);
  }
};

export const postUser = async (req, res, next) => {
  try {
    // get the repository
    const userRepository = getConnection().getRepository('User');

    // FOR DEMO - insert the user
    const insertedUser = await userRepository.save(req.body);

    // send a status code
    res.status(200).json(insertedUser);
  } catch (e) {
    next(e.message);
  }
};

