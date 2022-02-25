import { themes } from "./themes.js";
import { getItem, saveItem } from "./storage.js";

(() => {
  const app = {
    init() {
      this.cacheElements();
      this.addEventListeners();
      this.cacheData();
      this.changeTheme(this.selectedTheme);
    },
    cacheElements() {
      this.$themeButton = document.querySelector("#themeButton");
    },
    cacheData() {
      this.root = document.documentElement;
      this.currentTheme = Number(getItem("theme")) ?? 0;
      this.selectedTheme = themes[this.currentTheme];
      this.themeClickCount = 0;
    },
    addEventListeners() {
      this.$themeButton.addEventListener("click", (ev) => {
        ++this.themeClickCount;
        this.$themeButton.innerText = `How about faster?!`;
        if (this.themeClickCount > 1) return;
        setTimeout(() => {
          const nextNormalNr = this.currentTheme > 0 ? 0 : 1;
          this.currentTheme = this.themeClickCount > 1 ? 2 : nextNormalNr;
          saveItem("theme", this.currentTheme);
          this.selectedTheme = themes[this.currentTheme];
          this.themeClickCount = 0;
          this.changeTheme(this.selectedTheme);
        }, 200);
      });
    },
    changeTheme(selectedTheme) {
      const nextNormalTheme = selectedTheme.name === "Dark" ? "White" : "Dark";
      const nextTheme =
        selectedTheme.name === "90s"
          ? "The 90s are coming for u!"
          : `Switch to ${nextNormalTheme} theme?`;
      this.$themeButton.innerText = nextTheme;
      selectedTheme.colors.forEach((color) => {
        this.root.style.setProperty(color.name, color.hex);
      });
    },
  };
  app.init();
})();
