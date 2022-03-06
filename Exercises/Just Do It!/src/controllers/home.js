/**
 * A Home Controller
 */

import { getConnection } from "typeorm";

export const home = async (req, res, next) => {
  // variables of user selection.
  const userId = 1,
    categoryId = 1;

  try {
    // Establish connection with the user database.
    const repository = getConnection().getRepository("User");

    // Find all categories of the current user.
    const [{ categories }] = await repository.find({
      id: userId,
      relations: ["categories", "categories.tasks", "categories.tasks.tags"],
    });

    // find the active category and add selected to it.
    categories.find((c) => c.id === categoryId).selected = true;

    // Find all tasks of the current category
    const categoryTasks = categories.find((c) => c.id === categoryId).tasks,
      tasks = categoryTasks
        // Filter out completed tasks
        .filter((task) => !task.completed)
        // Sort tags
        .map((task) => {
          // sort based on id (default)
          task.tags.sort((a, b) => a.id - b.id);
          // sort based on order (if set)
          task.tags.sort((a, b) => a.order - b.order);
          // return whole task
          return task;
        })
        // sort tasks on id.
        .sort((a, b) => a.id - b.id),
      completeTasks = categoryTasks
        // Filter on completed tasks
        .filter((task) => task.completed)
        // sort tasks on id.
        .sort((a, b) => a.id - b.id);

    // Construct data
    const todoData = {
      userId,
      categoryId,
      categories,
      tasks,
      completeTasks,
    };

    // Render page with data
    res.render("home", { todoData });
  } catch (e) {
    next(e.message);
  }
};

export const homePostCategory = async (req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.user) throw new Error("Please provide a USER ID");
    if (!req.body.name) throw new Error("Please provide an name");

    // get the repositories
    const repository = getConnection().getRepository("Category");

    // Search if user is same as userId
    const taskExists = await repository.findOne({
      name: req.body.name,
      users: req.body.user,
    });

    if (taskExists) return res.status(200);

    await repository.save({
      name: req.body.name,
      users: req.body.user,
    });

    // Render homepage again
    res.redirect("/");
  } catch (e) {
    next(e.message);
  }
};

export const homePostTask = async (req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.category) throw new Error("Please provide a CATEGORY ID");
    if (!req.body.name) throw new Error("Please provide an name");

    // get the repositories
    const repository = getConnection().getRepository("Task");

    // Search if user is same as userId
    const taskExists = await repository.findOne({
      name: req.body.name,
      categories: req.body.category,
    });

    if (taskExists) return res.status(200);

    await repository.save({
      name: req.body.name,
      categories: req.body.category,
    });

    // Render homepage again
    res.redirect("/");
  } catch (e) {
    next(e.message);
  }
};

export const homePostTag = async (req, res, next) => {
  try {
    console.log(req.body);
    // validate incoming body
    if (!req.body.task) throw new Error("Please provide a TASK ID");
    if (!req.body.name) throw new Error("Please provide an name");

    // get the repositories
    const repository = getConnection().getRepository("Tag");

    // Search if user is same as userId
    const taskExists = await repository.findOne({
      name: req.body.name,
      tasks: req.body.task,
    });

    if (taskExists) return res.status(200);

    await repository.save({
      name: req.body.name,
      tasks: req.body.task,
    });

    // Render homepage again
    res.redirect("/");
  } catch (e) {
    next(e.message);
  }
};
