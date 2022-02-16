(() => {
  const app = {
    initialize() {
      this.weArePgmApi = new WeArePgmApi();
      this.cacheElements();
    },
    async cacheElements() {
      // this. = document.querySelectorAll('selector');
      this.$students = document.querySelector(".students");
      this.students = await this.weArePgmApi.getStudents();
      // console.log(this.students);
      this.generateUI();
    },
    generateUI() {
      const studentsWithoutDuplicates = this.students.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (e) =>
              e.firstname === value.firstname &&
              e.lastname === value.lastname &&
              e.nickname === value.nickname &&
              e.age === value.age &&
              e.avatar === value.avatar
          )
      ); // [1, 2, 3, 4]
      const studentsWithoutIncorrectData = studentsWithoutDuplicates.filter(
        (s) => {
          const legitData = !!(
            typeof s.firstname === "string" &&
            typeof s.lastname === "string" &&
            typeof s.nickname === "string" &&
            typeof s.classname === "string" &&
            typeof s.email === "string" &&
            typeof s.age === "number" &&
            typeof s.avatar === "string" &&
            Array.isArray(s.hobbies) &&
            typeof s.motto === "string" &&
            typeof s.about === "string"
          );

          if (legitData) return s;
        }
      );
      this.$students.innerHTML = studentsWithoutIncorrectData
        .map((s) => {
          return `
          <article class="student" style="background-image: url(${s.avatar})">
              <h2 class="student__name">${s.firstname} ${s.lastname}</h2>
              <div class="student__info">
                  <h3>${s.nickname}</h3>
                  <p>Houdt van ${s.hobbies.join(", ")}</p>
                  <p>${s.about}</p>
              </div>
          </article>
        `;
        })
        .join("");
    },
  };
  // Start initialization.
  app.initialize();
})();
