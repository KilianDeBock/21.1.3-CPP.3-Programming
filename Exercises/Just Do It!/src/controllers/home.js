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
      categories,
      tasks,
      completeTasks,
    };

    res.render('home', {todoData});
  } catch (e) {
    next(e.message);
  }
};

