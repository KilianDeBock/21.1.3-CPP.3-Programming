/**
 * The API controllers
 */
const {createConnection, getConnection} = typeorm;
import typeorm from 'typeorm';

export const deleteInterest = async (req, res, next) => {
  try {
    // catching the id from params
    const {id} = req.params;

    // validate incoming variables
    if (!id) {
      throw new Error('Please specify an id to remove.');
    }

    // get the interestrepository
    const interestRepository = getConnection().getRepository('Interest');

    // check if the id exists
    const interest = await interestRepository.findOne({id});

    // validate and send error
    if (!interest) throw new Error(`The interest with id ${id} does not exist.`);

    // remove the interest
    await interestRepository.remove({id});

    // send a success message
    res.status(200).json({status: `Deleted interest with id ${id}.`});
  } catch (e) {
    next(e.message);
  }
};

export const updateInterest = async (req, res, next) => {
  try {
    // validate incoming data
    if (!req.body.id) throw new Error('Please provide an id for the interest you want to update.');

    // get the repository
    const interestRepository = getConnection().getRepository('Interest');

    // check if the name already exists
    const interest = await interestRepository.findOne({
      where: {id: req.body.id}
    });

    // check for duplicates
    if (!interest) throw new Error('The given interest does not exist.');

    // update the interest
    await interestRepository.save({...interest, ...req.body});

    // send a success message
    res.status(200).json({status: `Updated interest with id ${req.body.id}.`});
  } catch (e) {
    next(e.message);
  }
};

export const getInterests = async (req, res, next) => {
  try {
    // get the repository
    const interestRepository = getConnection().getRepository('Interest');

    // get the interests and return them with status code 200
    res.status(200).json(await interestRepository.find());
  } catch (e) {
    next(e.message);
  }
};

export const postInterest = async (req, res, next) => {
  try {
    // validate incoming data
    if (!req?.body?.name) throw new Error('Please provide a name for an interest.');

    // get the repository
    const interestRepository = getConnection().getRepository('Interest');

    // check if the name already exists
    const interest = await interestRepository.findOne({
      where: {name: req.body.name}
    });

    // check for duplicates
    if (interest) throw new Error('The name already exists. Please provide a new name.');

    // insert the interests
    const insertedInterest = await interestRepository.save(req.body);

    // send a status code
    res.status(200).json({status: `Inserted interest with id ${insertedInterest.id}.`});
  } catch (e) {
    next(e.message);
  }
};

