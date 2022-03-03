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
      {
        name: "Work",
        current: false,
      },
    ],
    tasks: [
      {
        task: "Print new documentation papers.",
        tags: ["Printing", "Papers", "Work", "TeamViewer"],
      },
      {
        task: "Make new function in Discord bot.",
        tags: ["Coding"],
      },
    ],
    completeTasks: [
      {
        task: "Make meme your project manager!",
        tags: ["Work"],
      },
    ],
  };
  res.render("home", { todoData });
};
