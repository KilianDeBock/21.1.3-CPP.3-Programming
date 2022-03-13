const splash = {
  init() {
    this.cacheDOMElements();
    this.initDragAndDrop();
  },
  cacheDOMElements() {
    this.$pokeball = document.querySelector('#pokeball');
    this.$pikachu = document.querySelector('#pikachu');
    this.$splash = document.querySelector('#splash');
    this.$order = document.querySelector('#order');
  },
  initDragAndDrop() {
    const dragEl = this.$pokeball;
    const dropEl = this.$pikachu;

    dragEl.draggable = true;
    // Word gestart met slepen
    dragEl.ondragstart = (ev) => {
      console.log('start');
      dropEl.classList.add('jump');
      ev.dataTransfer.effectAllowed = 'link';
      ev.dataTransfer.setData('text/plain', 'Gotta catch \'em all!');
    };
    // Slepen word gestopt
    dragEl.ondragend = (ev) => {
      console.log('end');
      dropEl.classList.remove('jump');
    };
    // We komen een drop area binnen
    dropEl.ondragenter = (ev) => {
      console.log('enter');
      dropEl.classList.add('catch');

    };
    // We verlaten de drop area
    dropEl.ondragleave = (ev) => {
      console.log('hihi');
      dropEl.classList.remove('catch');
    };
    // we slepen over het drop element
    dropEl.ondragover = (ev) => {
      ev.preventDefault();
      console.log('ohn :\'(');
    };
    // we slepen over het drop element
    dropEl.ondrop = (ev) => {
      dropEl.classList.remove('jump');
      dropEl.classList.remove('catch');
      dropEl.classList.add('captured');
      console.log('Ohhh <3');

      // alert(ev.dataTransfer.getData('text/plain'));
      setTimeout(() => this.exitGame(), 1000);
    };
  },
  exitGame() {
    this.$splash.classList.add('hidden');
    this.$order.classList.remove('hidden');
  },
};

splash.init();
