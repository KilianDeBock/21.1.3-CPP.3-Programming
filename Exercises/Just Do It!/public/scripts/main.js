(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.generateUI();
    },
    cacheElements() {
      // this.$ = document.querySelectorAll('selector');
      this.$todoaddInput = document.querySelector('.todo-add input');
    },
    generateUI() {
      const randomTodos = [
          'Make Bed',
          'Pick up clutter around the house',
          'Clean what dishes are in the sink after breakfast',
          'Spend 30 minutes in the garden or flowerbed',
          'Walk the dog',
          'Hit the gym',
          'Pay bills',
          'Meet George',
          'Buy eggs',
          'Make food',
          'Read a book',
          'Organize office',
          'The Task You Will Forget',
          'The Things You Absolutely Must Do Today',
          'The New Habit',
          'The Step Towards Your Goal',
          'The Menial Task',
          'The Promise You Made to Someone',
          'The Task You Delegated',
          'The Task You Need to Do For Yourself',
          'The Task with a Deadline',
          'The Answer You Are Waiting For'
        ],
        randomTodo = Math.floor(Math.random() * randomTodos.length);

      this.$todoaddInput.placeholder = randomTodos[randomTodo];
    }
  };
  // Start initialization.
  app.initialize();
})();