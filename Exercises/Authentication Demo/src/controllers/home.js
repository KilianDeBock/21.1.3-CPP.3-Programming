/**
 * A Home Controller
 */

import {getConnection} from 'typeorm';

export const home = async (req, res) => {
  // get the user repository
  const userRepository = getConnection().getRepository('User');

  // for DEMO, return the first user in the users table
  const userData = await userRepository.findOne({
    where: {
      id: req.user?.userId
    },
    relations: ['user_meta']
  });

  // render the home page
  res.render('home', {
    userData
  });
};