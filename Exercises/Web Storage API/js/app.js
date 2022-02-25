import { getArray, saveArray } from "./storage.js";

(() => {
  const app = {
    init() {
      this.cacheElements();
      this.registerListeners();
      this.createHTMLList();
    },
    cacheElements() {
      this.currentList = getArray("list");
      this.$groceryForm = document.querySelector("#groceryForm");
      this.$groceryFormInput = document.querySelector("#grocery");
      this.$groceryFormButton = document.querySelector("#add");
      this.$groceryList = document.querySelector("#groceries");
    },
    registerListeners() {
      this.$groceryForm.addEventListener("submit", (ev) => {
        ev.preventDefault();
        this.$groceryFormButton.click();
      });
      this.$groceryFormButton.addEventListener("click", (ev) => {
        const value = this.$groceryFormInput.value;
        if (!value) return;
        this.$groceryFormInput.value = "";
        this.updateList(value);
      });
    },
    updateList(value) {
      this.currentList.push(value);
      saveArray("list", this.currentList);
      this.createHTMLList();
    },
    createHTMLList() {
      const list = this.currentList;
      if (list === []) return;

      this.$groceryList.innerHTML = list.map((li) => `<li>${li}</li>`).join("");
    },
  };

  app.init();
})();
