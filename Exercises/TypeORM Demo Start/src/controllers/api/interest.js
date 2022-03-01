/**
 * API -
 */
import { getConnection } from "typeorm";

export const postInterest = async (req, res, next) => {
  try {
    if (!req.body.name) throw new Error("Please provide a name.");

    const interestRepository = getConnection().getRepository("Interests");

    const interest = await interestRepository.findOne({
      where: { name: req.body.name },
    });

    if (interest) {
      return res.status(200).json({
        status: `Intrest already exists with id: ${interest.id}`,
        data: interest,
      });
    }

    const insertedInterest = await interestRepository.save(req.body);

    console.log(insertedInterest);

    res.status(200).json({
      status: `Posted interest with id: ${insertedInterest.id}`,
      data: insertedInterest,
    });
  } catch (e) {
    next(e.message);
  }
};

export const getInterest = async (req, res, next) => {
  try {
    const interestRepository = getConnection().getRepository("Interests"),
      interests = await interestRepository.find();

    res.status(200).json(interests);
  } catch (e) {
    next(e.message);
  }
};

export const deleteInterest = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("Please specify an id to remove");

    const interestRepository = getConnection().getRepository("Interest");

    const interest = await interestRepository.findOne({ id });

    if (!interest)
      throw new Error(`The interest with id ${id} does not exist.`);

    await interestRepository.remove({ id });

    res.status(200).json({ status: `Deleted interest with id: ${id}` });
  } catch (e) {
    next(e.message);
  }
};

export const updateInterest = async (req, res, next) => {
  try {
    if (!req.body.id)
      throw new Error(
        "Please provide a id for the intrest you want to update."
      );

    const interestRepository = getConnection().getRepository("Interest");

    const interest = await interestRepository.findOne({
      where: { id: req.body.id },
    });

    if (!interest) throw new Error("The given interest does not exist.");

    const updatedInterest = {
      ...interest,
      id: req.id,
      name: req.name,
    };

    await interestRepository.save(updatedInterest);

    res
      .status(200)
      .json({ status: "Updated interest.", data: updatedInterest });
  } catch (e) {
    next(e.message);
  }
};
