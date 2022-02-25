/**
 * App.js LocalStorage Demo
 */

console.log(localStorage);
console.log(sessionStorage);

// Iets weg schrijven naar de storage

localStorage.setItem("firstname", "Kilian");
localStorage.setItem("lastname", "De Bock");
localStorage.setItem("age", 21);
localStorage.setItem("alive", true);

const firstname = localStorage.getItem("firstname");
const lastname = localStorage.getItem("lastname");

const person = {
  firstname: "Liam",
  lastname: "De Bock",
  adress: {
    street: "Kipjeslaan 24",
    city: "Ghent",
  },
  skills: ["unkown", "unavailable"],
};

localStorage.setItem("person", JSON.stringify(person));
const localPerson = JSON.parse(localStorage.getItem("person"));
console.log(localPerson);

localStorage.clear();
