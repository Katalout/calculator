"use strict";

let num1;
let num2;
let operator = false;
let result = false;

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

const span2 = document.createElement("span");

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {

    if (operator) {
      span2.textContent += button.textContent;
      num2 = +span2.textContent;
      console.log("num2 is " + num2);
    } else {

      let type = button.textContent;
      display.textContent += type;
      num1 = +display.textContent;
      console.log("num1 is " + num1);

    }

  });
});

// this just in: több szamjegynel többször irodik ki a plusz is, meg az egyenlöseg is, ha nestelem őket, de ugy legalabb resetelödik a once ha clearelem
// ha viszont kiveszem global szintre, akkor a once az végleges... hmmm ki lehet ezt vhogy csapni a clearrel?

addButton.addEventListener("click", () => {
  if (operator == add) return undefined; // ez akkor jo, ha nem akarunk egynel több müveletet egyszerre
  operator = add;
  console.log(operator);
  const span = document.createElement("span");
  span.textContent += addButton.textContent;
  display.appendChild(span);
  display.appendChild(span2);
});

const equals = document.querySelector(".equal");

equals.addEventListener("click", () => {
  if (result) return undefined;
  result = operator(num1, num2);
  console.log(`equals ${result}`);
  const span = document.createElement("span");
  span.textContent = `=${result}`;
  display.appendChild(span);
});





//nah 1jegyü szamokkal müködik az assignment meg a displayeles is, nice.
// akkor most kene, hogy az egyenlösegjellel elvegezze a müveletet.




//ok, ki is irja az eredmenyt.

//akkor most kene tudni többjegyü szamot csinalni num1-be--varj ez mar megvan lol
//tudjon több jegyü szamot csinalni num2-be MEGVAN BITCH
//majd a pluszjelbe kene rakni "once" cuccot hogy csak egyszer irja kiiiiii - raktam puszi (bár lehet h ez később foscsi lesz, bar a clear-rel valszeg megoldhato

// mit csinaljon a clear??
//-ha megnyomom, törölje a display contenteket,

const clearButton = document.querySelector(".clear");

function clear() {
  display.innerHTML = '';
  //-es resetelje a num1,num2,operator variable-öket...
  num1 = '';
  num2 = '';
  operator = false;
  //apparently ezt is resetelni köllött
  span2.textContent = '';
  result = false;
};

clearButton.addEventListener("click", clear);




