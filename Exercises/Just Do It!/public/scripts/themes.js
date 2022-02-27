import {themes} from '/assets/themes.js';
import {getItem, saveItem} from './storage.js';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

(() => {
  const app = {
    init() {
      this.cacheElements();
      this.addEventListeners();
      this.cacheData();
      this.changeTheme(this.selectedTheme);
    },
    cacheElements() {
      this.$themeButton = document.querySelector('#themeButton');
      this.$mainBackround = document.querySelector('#background__main');
      this.$transBackground = document.querySelector('#background__transition');
    },
    cacheData() {
      this.root = document.documentElement;
      this.currentTheme = Number(getItem('theme')) ?? 0;
      this.oldTheme = this.currentTheme;
      this.selectedTheme = themes[this.currentTheme];
      this.themeClickCount = 0;
    },
    addEventListeners() {
      this.$themeButton.addEventListener('click', (ev) => {
        ++this.themeClickCount;
        this.$themeButton.innerText = `How about faster?!`;
        if (this.themeClickCount > 1) return;
        setTimeout(() => {
          this.oldTheme = this.currentTheme;
          const nextNormalNr = this.currentTheme > 0 ? 0 : 1;
          this.currentTheme = this.themeClickCount > 1 ? 2 : nextNormalNr;
          saveItem('theme', this.currentTheme);
          this.selectedTheme = themes[this.currentTheme];
          this.themeClickCount = 0;
          this.changeTheme(this.selectedTheme);
        }, 200);
      });
    },
    async changeTheme(selectedTheme) {
      const nextNormalTheme = selectedTheme.name === 'Dark' ? 'White' : 'Dark';
      this.$themeButton.innerText = selectedTheme.name === '90s'
        ? 'The 90s are coming for u!'
        : `Switch to ${nextNormalTheme} theme?`;

      const oldTheme = themes[this.oldTheme];
      const [pri, pridark] = oldTheme.colors.filter((theme, index) => {
        if (theme.name === '--color-primary' || theme.name === '--color-primary-dark')
          return true;
      });
      this.$transBackground.style.background = `linear-gradient(-45deg, ${pridark.hex}, ${pri.hex})`;
      this.$mainBackround.style.opacity = '0';

      await sleep(200);
      selectedTheme.colors.forEach((color) => {
        this.root.style.setProperty(color.name, color.hex);
      });
      this.$mainBackround.style.opacity = '1';
    },
  };
  app.init();
})();
