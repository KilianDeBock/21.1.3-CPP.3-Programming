(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.registerListeners();
      this.generateUI();
    },
    cacheElements() {
      // this.$ = document.querySelectorAll('selector');
      this.$todoaddInput = document.querySelector('.todo-add input');
      this.$tagForms = document.querySelectorAll('.tag--add__form');
    },
    registerListeners() {
      this.$tagForms.forEach((tagForm) => {
        tagForm.addEventListener('submit', (ev) => {
          ev.preventDefault();
          const input = ev.target.querySelector('.tag--add__input');
          console.log('Adding', input.value);
          input.value = '';
        });

        tagForm.addEventListener('keydown', (ev) => {
          if (ev.keyCode === 32) {
            console.log('Adding', ev.target.value);
            ev.target.value = '';
            setTimeout(() => ev.target.value = '', 50);
          }
        });


      });
    },
    generateUI() {
      const randomTodos = [
          'Make bed?',
          'Pick up clutter around the house?',
          'Clean what dishes are in the sink after breakfast?',
          'Spend 30 minutes in the garden or flowerbed?',
          'Walk the dog?',
          'Hit the gym?',
          'Pay bills?',
          'Meet george?',
          'Buy eggs?',
          'Make food?',
          'Read a book?',
          'Organize office?',
          'The task you will forget?',
          'The things you absolutely must do today?',
          'The new habit?',
          'The step towards your goal?',
          'The menial task?',
          'The promise you made to someone?',
          'The task you delegated?',
          'The task you need to do for yourself?',
          'The task with a deadline?',
          'The answer you are waiting for?',
        ],
        randomTodo = Math.floor(Math.random() * randomTodos.length);

      this.$todoaddInput.placeholder = randomTodos[randomTodo];
    },
  };
  // Start initialization.
  app.initialize();
})();
