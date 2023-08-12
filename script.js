const CALC_OPERATORS = ["+", "-", "*", "/", "%"];
// const DECIMALS = ["1", "2", "3", "4", "5", "6", "7", "9", "0", "."];

let calculation = "";
let input = "0";
// const includesOperator = CALC_OPERATORS.includes(calculation.slice(-1));
let operatorMode = false;

const buttons = document.querySelectorAll(".button");
const inputSpan = document.querySelector(".input > span");
const calcSpan = document.querySelector(".calculation > span");

buttons.forEach((button) =>
	button.addEventListener("click", () => {
		handleButton(button.attributes["data-button"].value);
		updateInputSpan();
		updateCalcSpan();
		// calculated = input.trim();
		// calcSpan.textContent = calculated;
		// input = button.textContent;
		// inputSpan.textContent = input;
	})
);

function handleButton(buttonValue) {
	switch (buttonValue) {
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
		case "0":
			handleNumbers(buttonValue);
			break;
		case ".":
			handleDecimal();
			break;
		case "backspace":
			handleBackSpace();
			break;
		case "+/-":
			handleSignChange();
			break;
		case "+":
			handleOperators(buttonValue);
			break;
		default:
			break;
	}
	if (operatorMode && (!isNaN(buttonValue) || buttonValue === "."))
		operatorMode = false;
}

// ! BUTTON HANDLERS
function handleNumbers(number) {
	if (Number(input) === 0 || operatorMode || input === "" || isNaN(input)) {
		input = number;
	} else if (input.length < 16 && input < Number.MAX_SAFE_INTEGER)
		input += number;
	13;
}

function handleDecimal() {
	if (operatorMode || input === "" || isNaN(input)) {
		input = "0.";
		return;
	}

	input += !input.includes(".") ? "." : "";
}

function handleBackSpace() {
	input = input.slice(0, -1);
}

function handleOperators(operator) {
	if (operatorMode) {
		calculation = calculation.slice(0, -1) + operator;
		return;
	}

	if (calculation.length !== 0) {
		const calcArray = calculation.split(" ");
		// const currentOperator = calcArray[1];
		input = add(calcArray[0], input);
	}

	console.log(operator, calculation);
	calculation = `${input} ${operator}`;
	operatorMode = true;
}

function handleSignChange() {
	input = input.charAt(0) === "-" ? input.slice(1) : (input = `-${input}`);
}

function evalInput() {}

// Calculate methods
function add(a, b) {
	return (Number(a) + Number(b)).toString();
}
function subtract(a, b) {
	return a - b;
}
function times(a, b) {
	return a * b;
}
function divide(a, b) {
	return a / b;
}
function module(a, b) {
	return a % b;
}
function plusminus(a) {
	return a * -1;
}

// Auxilary Functions

function updateInputSpan() {
	const len = input.length;

	if (len < 8) {
		inputSpan.textContent = input;
		return;
	}

	// Trim input from left if longer than max-width = 8ch
	inputSpan.textContent = `${input}`.substring(len - 8);
}

function updateCalcSpan() {
	const len = calculation.length;

	if (len < 70) {
		calcSpan.textContent = calculation;
		return;
	}

	// Trim calculation from left if longer than 70ch
	inputSpan.textContent = `${calculation}`.substring(len - 70);
}
