/**
 * The API controllers
 */
const {createConnection, getConnection} = typeorm;
import typeorm from 'typeorm';

export const getRoles = async (req, res, next) => {
  try {
    // get the repository
    const roleRepository = getConnection().getRepository('Role');

    // get the interests and return them with status code 200
    res.status(200).json(await roleRepository.find({relations: ['user']}));
  } catch (e) {
    next(e.message);
  }
};
