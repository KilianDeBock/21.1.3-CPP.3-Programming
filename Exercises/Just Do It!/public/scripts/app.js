(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.registerListeners();
      this.generateUI();
    },
    cacheElements() {
      this.$todoaddInput = document.querySelector(".todo-add input");
      this.$addCategory = document.querySelector(".todo-add__category");
      this.$tagForms = document.querySelectorAll(".tag--add__form");
      this.$tagAddLis = document.querySelectorAll(".tag--add");
    },
    registerListeners() {
      this.$addCategory.addEventListener("click", async (ev) => {
        const name = document.querySelector(".todo-add input").value,
          user = document.querySelector("#todo-add__user").value,
          data = {
            name,
            user,
          };
        await fetch("/postCategory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        location.reload();
      });

      this.$tagAddLis.forEach((addLi) => {
        addLi.addEventListener("click", (ev) => {
          switch (ev.target.type) {
            case "text":
              break;
            case undefined:
              ev.target.parentNode
                .querySelector(".tag--add__form .tag--add__input")
                .focus();
              break;
            default:
              ev.target
                .querySelector(".tag--add__form .tag--add__input")
                .focus();
          }
        });
      });

      this.$tagForms.forEach((tagForm) => {
        tagForm.addEventListener("keydown", (ev) => {
          if (ev.keyCode === 32) {
            ev.target.parentNode.submit();
          }
        });
      });
    },
    generateUI() {
      const randomTodos = [
          "Make bed?",
          "Pick up clutter around the house?",
          "Clean what dishes are in the sink after breakfast?",
          "Spend 30 minutes in the garden or flowerbed?",
          "Walk the dog?",
          "Hit the gym?",
          "Pay bills?",
          "Meet george?",
          "Buy eggs?",
          "Make food?",
          "Read a book?",
          "Organize office?",
          "The task you will forget?",
          "The things you absolutely must do today?",
          "The new habit?",
          "The step towards your goal?",
          "The menial task?",
          "The promise you made to someone?",
          "The task you delegated?",
          "The task you need to do for yourself?",
          "The task with a deadline?",
          "The answer you are waiting for?",
        ],
        randomTodo = Math.floor(Math.random() * randomTodos.length);

      this.$todoaddInput.placeholder = randomTodos[randomTodo];
    },
  };
  // Start initialization.
  app.initialize();
})();
