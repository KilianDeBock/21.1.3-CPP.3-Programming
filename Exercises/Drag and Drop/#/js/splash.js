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

    // init draggable attribute
    dragEl.draggable = true;

    // when dragging starts, pikachu is happy
    dragEl.ondragstart = (e) => {
      dropEl.classList.add("jump");
      e.dataTransfer.effectAllowed = "link";
      e.dataTransfer.setData("text/plain", "Gotta catch 'm all");
    };

    // when dragging stops, pikachu stops jumping
    dragEl.ondragend = (e) => {
      dropEl.classList.remove("jump");
      dropEl.classList.remove("catch");
    };

    // draggable element above droppable element
    dropEl.ondragenter = (e) => {
      dropEl.classList.add("catch");
    };

    // draggable element not above droppable element
    dropEl.ondragleave = (e) => {
      dropEl.classList.remove("catch");
    };

    // make drop element valid by disabling std behaviour
    dropEl.ondragover = (e) => {
      e.preventDefault();
    };

    dropEl.ondrop = (e) => {
      dropEl.classList.add("captured");
      alert(e.dataTransfer.getData("text/plain"));
      this.exitGame();
    };
  },
  exitGame() {
    this.$splash.classList.add("hidden");
    this.$order.classList.remove("hidden");
  },
};

splash.init();
