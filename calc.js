"use strict";

let num1 = false;
let num2 = false;
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

function isDecimal(num) {
  console.log(num);
  if ((num === undefined) || !num) return undefined;
  return (num).includes('.');
};

function getDisplayContents() {
  let displayContentsNL = display.childNodes;
  let displayContentsArr = Array.from(displayContentsNL);
  return displayContentsArr;
}


const equals = document.querySelector(".equal");
equals.addEventListener("click", () => {
  if (result || !num2 || !num1) return undefined;
  result = operator(+num1, +num2);
  console.log(result);
  if (result === "math says no") {
    clear();
    //display.innerHTML = '';
    display.textContent = "math says no.";
    result = true;
    return undefined;
  };
  console.log(`equals ${result}`);
  const span = document.createElement("span");
  let roundedResult = Math.round(result * 1000) / 1000;
  if (result === roundedResult) span.textContent = `= ${result}`;
  else span.textContent = `= ~${roundedResult}`;
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

const spanOperator = document.createElement("span");


operators.forEach(obj => {
  obj.button.addEventListener("click", () => {
    if (!num1) return undefined;
    if (num2) {
      result = false;
      let részResult = operator(+num1, +num2);
      let roundedResult = Math.round(részResult * 1000) / 1000;
      console.log(`részResult ${részResult}`);
      display.innerHTML = '';
      operator = obj.function;
      if (részResult === roundedResult) display.textContent = részResult;
      else display.textContent = `~${roundedResult}`;
      spanOperator.textContent = obj.button.textContent;
      display.appendChild(spanOperator);
      num1 = részResult.toString();
      num2 = false;
      spanNum2.textContent = '';
      display.appendChild(spanNum2);
      console.log("num2 is " + +num2);
      return undefined;
    };
    console.log(obj.function);
    operator = obj.function;
    spanOperator.textContent = obj.button.textContent;
    if (!(getDisplayContents().includes(spanOperator))) display.appendChild(spanOperator);
    display.appendChild(spanNum2);
  }
  )
});

let latestNode;

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (result) clear();
    if (operator) {
      if (((isDecimal(num2)) || (!num2)) && (button.textContent == ".")) return undefined;
      spanNum2.textContent += button.textContent;
      num2 = spanNum2.textContent;
      console.log("num2 is " + +num2);
      latestNode = spanNum2;
    } else {
      if (((isDecimal(num1)) || (!num1)) && (button.textContent == ".")) return undefined;
      let type = button.textContent;
      display.textContent += type;
      num1 = display.textContent;
      latestNode = display;
      console.log("num1 is " + +num1);
      display.appendChild(spanOperator);
    }
    //button.blur();
  });
});

function undo() {
  if (((operator) && (!num2)) || result) return undefined;
  console.log(latestNode.textContent);
  let ujlast = latestNode.textContent.slice(0, latestNode.textContent.length - 1);
  console.log(`ujlast: ${ujlast}`);
  latestNode == display ? num1 = ujlast : num2 = ujlast;
  latestNode.textContent = ujlast;
  console.log(`num1: ${num1}, num2: ${num2}`);
}

const undoButton = document.querySelector(".undo");
undoButton.addEventListener("click", undo);

//nezzen ki jol telefonon is -meh

// add keyboard support! damn. add keyboard support to operators: maybe just to "add" at first.

const html = document.querySelector("html");

html.addEventListener("keydown", (event) => {
  let keydown = event.key;
  console.log(keydown);
  console.log(event);
  //a keydown-t keresse az operatorsban, ha megtalalja akk tovabb
  let check = findKey(buttons, keydown);
  console.log(`check:${check}`);
  if (check) {
    console.log(`check.key:${check.key}`);
    console.log(`corresponding button:${check.button}`);
    check.button.dispatchEvent(new Event('click'));
    // display.focus();  de lehet ezt egyel kijjebb kellene rakni
  }
});



/* if (keydown === "+") {
   console.log("add");
   //triggerelje a plusz lenyomasat dik
   addButton.dispatchEvent(new Event('click'));
 }
});*/

let zip3 = (arrayofobjects, array2) => arrayofobjects.map((obj, i) => {
  obj["key"] = array2[i];
  return obj;
});

operators = zip3(operators, ["+", "-", "x", "/",]);

function findKey(array, keyy) {
  return array.find((object) => object.key == keyy)
};
//nah operatorokra van keyboard support de ez a default buttonnfocus ize zavarooooo, de nembiztos h nekem ezzel foglalkoznom kell

//csinalni arrayt az összes buttonbol i guess?
const buttonsNL = document.querySelectorAll("button");
let buttons = Array.from(buttonsNL);
buttons = buttons.map((button) => {
  let obj = {};
  obj["key"] = button.textContent;
  obj["button"] = button;
  return obj;
});
buttons[16].key = "Backspace";
buttons[17].key = "Enter";
buttons[9].key = "c";

buttons.forEach((button) => button.button.addEventListener("click", () => button.button.blur()));


//OKAYYY bitchesss keyboard support is ON
// maybe add multiple options for clear, enter and comma?
// now last things:
// -make code prettier
// -maybe bring all buttons and functions into one array??
// -then the listeners can be just one function, maybe.
// -README.. gah.
// -
