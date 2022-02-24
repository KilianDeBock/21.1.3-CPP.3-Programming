/**
 * A Home Controller
 */

export const home = (req, res) => {
  const todoData = {
    categories: [
      {
        name: "Default",
        current: true,
      },
      {
        name: "Household",
        current: false,
      },
    ],
    tasks: [
      { task: "Print new documentation papers." },
      { task: "Make new function in Discord bot." },
    ],
    completeTasks: [
      { task: "Make meme your project manager!" },
      { task: "Make meme your project manager!" },
      { task: "Make meme your project manager!" },
    ],
  };
  res.render("home", { todoData });
};
