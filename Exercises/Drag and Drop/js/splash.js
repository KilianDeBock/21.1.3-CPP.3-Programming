const splash = {
  init() {
    this.cacheDOMElements();
    this.initDragAndDrop();
  },
  cacheDOMElements() {
    this.$pokeball = document.querySelector("#pokeball");
    this.$pikachu = document.querySelector("#pikachu");
    this.$splash = document.querySelector("#splash");
    this.$order = document.querySelector("#order");
  },
  initDragAndDrop() {
    const dragEl = this.$pokeball;
    const dropEl = this.$pikachu;
  },
  exitGame() {
    this.$splash.classList.add("hidden");
    this.$order.classList.remove("hidden");
  },
};

splash.init();
