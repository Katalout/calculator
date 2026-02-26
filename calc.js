"use strict";

let num1;
let num2;
let operator = false;

const operate = function (num1, operator, num2) {
  return operator(num1, num2);
};

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const sum = function (array) {
  return array.reduce((sum, num) => sum + num, 0)
};

const multiply = function (array) {
  return array.reduce((prev, current) => prev * current)
};

const divide = function (a, b) {
  return a / b;
}

const power = function (base, exponent) {
  return base ** exponent;
};

const factorial = function (num) {
  let result = 1;
  for (let i = 1; i <= num; i++) {
    result = result * i;
    console.log(result);
  }
  return result;
};

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");

/*numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let type = button.textContent;
    display.textContent += type;
    num1 = +display.textContent;
    console.log(num1);
  });
});*/

const operators = document.querySelectorAll(".operator");

// make objects to store button+operator function together?
//or just do them one by one, its only 4....

//when i push button, let operator be that function

const addButton = document.querySelector(".add");


// how to get num2? nest the three handlers?
//apparently not

// nest num2 creation in if?

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {

    if (operator) {
      const span = document.createElement("span");
      span.textContent += button.textContent;
      display.appendChild(span);
      num2 = +span.textContent;
      console.log("num2 is " + num2);
    } else {

      let type = button.textContent;
      display.textContent += type;
      num1 = +display.textContent;
      console.log("num1 is " + num1);
      addButton.addEventListener("click", () => {
        operator = add;
        console.log(operator);
        const span = document.createElement("span");
        span.textContent += addButton.textContent;
        display.appendChild(span);

      });
    }
  });
});

//nah 1jegyü szamokkal müködik az assignment meg a displayeles is, nice.
// akkor most kene, hogy az egyenlösegjellel elvegezze a müveletet.

const equals = document.querySelector(".equal");

equals.addEventListener("click", () => {
  let result = operator(num1, num2);
  console.log(`equals ${result}`);
  // ok, megcsinalja az egyenletet. akkor most irja is ki az eredemnyt
  const span = document.createElement("span");
  span.textContent = `=${result}`;
  display.appendChild(span);
});
//ok, ki is irja az eredmenyt.

//akkor most kene tudni többjegyü szamot csinalni num1-be--varj ez mar megvan lol
//tudjon több jegyü szamot csinalni num2-be



//majd a pluszjelbe kene rakni "once" cuccot hogy csak egyszer irja kiiiiii
