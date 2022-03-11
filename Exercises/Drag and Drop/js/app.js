/**
 *
 * Drag & Drop example
 * @author: Artevelde University College Ghent
 */

const app = {
  init() {
    // empty array that will be filled with ordered list item ids
    this.orderIDs = [];

    // cache elements
    this.cacheDOMElements();

    // populate orderIds array
    this.initOrder();

    // start listening
    this.initDragAndDrop();
  },
  cacheDOMElements() {
    this.$stepsUl = document.querySelector("#steps");
    this.$allStepsLi = document.querySelectorAll("#steps li");
  },
  initOrder() {
    this.$allStepsLi.forEach(($stepLi) => {
      this.orderIDs.push($stepLi.id);
    });
  },
  initDragAndDrop() {},
  initReorder() {},
  postNewOrder() {},
};

app.init();
