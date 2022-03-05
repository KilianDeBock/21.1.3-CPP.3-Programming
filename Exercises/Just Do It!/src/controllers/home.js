/**
 * A Home Controller
 */

import {getConnection} from 'typeorm';

export const home = async (req, res, next) => {
  const selectedUser = 1;
  const selectedCategory = 0;
  try {
    const repository = getConnection().getRepository('User');

    // const [userData] = await repository.find({
    //   id: selectedUser,
    //   relations: ['categories', 'categories.tasks', 'categories.tasks.tags'],
    // });

    const [{categories}] = await repository.find({
      id: selectedUser,
      relations: ['categories'],
    });

    categories[selectedCategory].selected = true;

    const [{categories: categoriesWithTasks}] = await repository.find({
      id: selectedUser,
      relations: ['categories', 'categories.tasks', 'categories.tasks.tags'],
    });

    const categoryTasks = categoriesWithTasks[selectedCategory].tasks;
    const tasksCompleted = categoryTasks.filter(task => !task.completed);
    const tasks = tasksCompleted.map(task => {
      task.tags.sort((a, b) => a.order - b.order);
      return task;
    });
    const completeTasks = categoryTasks.filter(task => task.completed);


    const todoData = {
      id: selectedUser,
      currentCategoryId: selectedCategory,
      categories,
      tasks,
      completeTasks,
    };

    res.render('home', {todoData});
  } catch (e) {
    next(e.message);
  }
};

export const homePostTask = async (req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.userId) throw new Error('Please provide a USER ID');
    if (!req.body.name) throw new Error('Please provide an interest');

    // get the repositories
    const userRepository = getConnection().getRepository('User');

    // Search if user is same as userId
    const user = await userRepository.findOneOrFail({
      where: {id: parseInt(req.body.userId)},
      relations: ['categories'],
    });

    // Search if interest already exists
    // let task = await userRepository.findOne({
    //   where: {
    //     id: req.body.userId,
    //     categories: {
    //       id: req.body.currentCategory,
    //       tasks: {name: req.body.name}
    //     }
    //   }
    // });

    // If interest does not exist
    // if (!task) {
    const task = await userRepository.save({
      id: req.body.userId,
      categories: {
        id: req.body.currentCategory,
        tasks: {name: req.body.name}
      }
    });
    // }
    const hasInterest =
      user.interests.filter((interest) => interest.name === req.body.name)
        .length > 0;

    // If there's no interest
    if (!hasInterest) {
      user.interests.push(task);
      await userRepository.save(user);
    }

    // Render homepage again
    res.redirect('/');
  } catch (e) {
    next(e.message);
  }
};

