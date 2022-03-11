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
  initDragAndDrop() {
    // declare current
    let $currentLi = null;

    this.$allStepsLi.forEach(($stepLi) => {
      $stepLi.draggable = true;

      // make draggable element also droppable element
      $stepLi.ondragover = (e) => {
        return false;
      };

      // start dragging
      $stepLi.ondragstart = (e) => {
        $currentLi = $stepLi;
        this.$allStepsLi.forEach((i) => {
          if (i != $currentLi) {
            i.classList.add("hint");
          }
        });
      };

      // entering some drop area
      $stepLi.ondragenter = (e) => {
        if ($stepLi == $currentLi) return false;
        $stepLi.classList.add("active");
      };

      // leaving a drop area
      $stepLi.ondragleave = (e) => {
        if ($stepLi == $currentLi) return false;
        $stepLi.classList.remove("active");
      };

      // ending the drop action
      $stepLi.ondragend = (e) => {
        this.$allStepsLi.forEach((i) => {
          i.classList.remove("active");
          i.classList.remove("hint");
        });
      };

      // drop succesful
      $stepLi.ondrop = (e) => {
        // do nothing if dropped is same area as dragged
        if ($stepLi == $currentLi) return false;

        // get current position and remove from array
        const currentIndex = this.orderIDs.indexOf($currentLi.id);
        this.orderIDs.splice(currentIndex, 1);

        // get index of dropped step
        const newIndex = this.orderIDs.indexOf($stepLi.id);

        // place this step before or after
        if (currentIndex <= newIndex) {
          this.orderIDs.splice(newIndex + 1, 0, $currentLi.id);
        } else {
          this.orderIDs.splice(newIndex, 0, $currentLi.id);
        }

        // rearrange and post to an api
        this.initReorder();
        this.postNewOrder();
      };
    });
  },
  initReorder() {
    // rearrange the steps in a new array
    const newSteps = [];
    this.orderIDs.forEach((id) => {
      const el = document.querySelector(`#${id}`);
      newSteps.push(el);
    });

    // clear ul and populate with new steps
    this.$stepsUl.innerHTML = "";
    newSteps.forEach((el) => {
      this.$stepsUl.appendChild(el);
    });
  },
  postNewOrder() {
    // do something
    // for example, fetch post action with new ordered id's
  },
};

app.init();
