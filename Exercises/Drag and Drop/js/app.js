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
    this.$stepsUl = document.querySelector('#steps');
    this.$allStepsLi = document.querySelectorAll('#steps li');
  },
  initOrder() {
    this.$allStepsLi.forEach(($stepLi) => {
      this.orderIDs.push($stepLi.id);
    });
  },
  initDragAndDrop() {
    let $currentLi = null;

    this.$allStepsLi.forEach($stepLi => {
      $stepLi.draggable = true;

      // valid drop element maken
      $stepLi.ondragover = (ev) => {
        ev.preventDefault();
      };

      // Start dragging
      $stepLi.ondragstart = (ev) => {
        $currentLi = $stepLi;

        this.$allStepsLi.forEach(i => i.classList.add('hint'));
      };

      // Stop dragging
      $stepLi.ondragend = (ev) => {
        $currentLi = $stepLi;

        this.$allStepsLi.forEach(i => {
          i.classList.remove('hint');
          i.classList.remove('active');
        });
      };

      $stepLi.ondragenter = (ev) => {
        if ($stepLi === $currentLi) return false;
        $stepLi.classList.add('active');
      };

      $stepLi.ondragleave = (ev) => {
        $stepLi.classList.remove('active');
      };

      $stepLi.ondrop = (ev) => {
        if ($stepLi === $currentLi) return false;

        // Huidige idn wissen uit de array van id's
        const currentInd = this.orderIDs.indexOf($currentLi.id);
        this.orderIDs.splice(currentInd, 1);

        // get index of dropped item (in orderids)
        const newInd = this.orderIDs.indexOf($stepLi.id);

        if (currentInd <= newInd) {
          this.orderIDs.splice(newInd + 1, 0, $currentLi.id);
        } else {
          this.orderIDs.splice(newInd, 0, $currentLi.id);
        }

        this.initReorder();
        this.postNewOrder();
      };
    });
  },
  initReorder() {
    const newSteps = [];
    this.orderIDs.forEach(id => {
      const el = document.querySelector(`#${id}`);
      newSteps.push(el);
    });

    this.$stepsUl.innerHTML = '';
    newSteps.forEach(el => {
      this.$stepsUl.appendChild(el);
    });
  },
  postNewOrder() {
    // fetch a post request, with new order
    // ->> new oderIds
  },
};

app.init();
