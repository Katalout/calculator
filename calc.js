"use strict";

let num1;
let num2;
let operator = false;
let result = false;
const spanNum2 = document.createElement("span");
const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");

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

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  if (b === 0) return "math says no";
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



/*numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let type = button.textContent;
    display.textContent += type;
    num1 = +display.textContent;
    console.log(num1);
  });
});*/



numberButtons.forEach((button) => {
  button.addEventListener("click", () => {

    if (operator) {
      spanNum2.textContent += button.textContent;
      num2 = +spanNum2.textContent;
      console.log("num2 is " + num2);
    } else {

      let type = button.textContent;
      display.textContent += type;
      num1 = +display.textContent;
      console.log("num1 is " + num1);
      display.appendChild(spanOperator);
    }

  });
});

// this just in: több szamjegynel többször irodik ki a plusz is, meg az egyenlöseg is, ha nestelem őket, de ugy legalabb resetelödik a once ha clearelem
// ha viszont kiveszem global szintre, akkor a once az végleges... hmmm ki lehet ezt vhogy csapni a clearrel?

const equals = document.querySelector(".equal");
equals.addEventListener("click", () => {
  if (result || !num2 || !num1) return undefined;
  result = operator(num1, num2);
  console.log(result);
  if (result === "math says no") {
    clear();
    //display.innerHTML = '';
    display.textContent = "math says no.";
    return undefined;
  };
  result = Math.round(result * 1000) / 1000;
  console.log(`equals ${result}`);
  const span = document.createElement("span");
  span.textContent = `=${result}`;
  span.setAttribute("id", "theResult");
  display.appendChild(span);
});

//majd a pluszjelbe kene rakni "once" cuccot hogy csak egyszer irja kiiiiii - raktam puszi (bár lehet h ez később foscsi lesz, bar a clear-rel valszeg megoldhato

const clearButton = document.querySelector(".clear");
function clear() {
  display.innerHTML = '';
  num1 = false;
  num2 = false;
  operator = false;
  spanNum2.textContent = '';
  spanOperator.textContent = '';
  result = false;
};
clearButton.addEventListener("click", clear);

// make objects to store button+operator function together?
//or just do them one by one, its only 4....

//müködjön a többi operator is, ne csak az add.

const addButton = document.querySelector(".add");
const subtractButton = document.querySelector(".subtract");
const multiplyButton = document.querySelector(".multiply");
const divideButton = document.querySelector(".divide");

const operatorButtons = [addButton, subtractButton, multiplyButton, divideButton]; //array of 4 operator button references
const operatorFunctions = [add, subtract, multiply, divide]; //array of 4 operator functions

let zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);
let zip2 = (a1, a2) => a1.map((x, i) => {
  let obj = {};
  obj["button"] = x;
  obj["function"] = a2[i];
  return obj;
});
let operators = zip2(operatorButtons, operatorFunctions);


// create function to assign operator=operatorfunction upon clicking an operatorbutton.

/*addButton.addEventListener("click", () => {
  if (operator == add) return undefined; // ez akkor jo, ha nem akarunk egynel több müveletet egyszerre
  operator = add;
  console.log(operator);
  const span = document.createElement("span");
  span.textContent += addButton.textContent;
  display.appendChild(span);
  display.appendChild(spanNum2);
});*/

const spanOperator = document.createElement("span");

operators.forEach(obj => {
  obj.button.addEventListener("click", () => {
    if (!num1) return undefined;
    if (num2) {
      result = false;
      let részResult = operator(num1, num2);
      let roundedResult = Math.round(részResult * 1000) / 1000;
      console.log(`részResult ${részResult}`);
      display.innerHTML = '';
      operator = obj.function;
      if (részResult === roundedResult) display.textContent = részResult + obj.button.textContent;
      else display.textContent = `~${roundedResult}${obj.button.textContent}`;
      num1 = részResult;
      num2 = false;
      spanNum2.textContent = '';
      display.appendChild(spanNum2);
      console.log("num2 is " + num2);
      return undefined;
    };
    console.log(obj.function);
    operator = obj.function;
    spanOperator.textContent = obj.button.textContent;
    display.appendChild(spanNum2);
  }
  )
});

//round result to 3 digits DONE

//Enter a second operator (-). At this point, it should evaluate the initial pair of numbers (12 + 7), then display the result (19). DONE

//Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator! dONE

// egyenlőség után lehessen folytatni, a resultot resetelni i guesss DONE

//Pressing = before entering all of the numbers or an operator could cause problems! (looks like if num2 is missing, we get a =NAN) DONE