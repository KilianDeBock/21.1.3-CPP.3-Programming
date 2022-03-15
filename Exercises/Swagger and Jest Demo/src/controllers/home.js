/**
 * A Home Controller
 */
const {createConnection, getConnection} = typeorm;
import typeorm from 'typeorm';

export const home = async (req, res) => {
  // get repositories
  const navigationItemRepository = getConnection().getRepository('NavigationItem');
  const userRepository = getConnection().getRepository('User');

  // fetch the menu items
  const menuItems = await navigationItemRepository.find();
  const userData = await userRepository.findOne({relations: ['interests']});

  res.render('home', {
    menuItems,
    userData
  });
};