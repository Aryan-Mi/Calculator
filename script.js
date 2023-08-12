let calculated = "420";
let input = "0";

const buttons = document.querySelectorAll(".button");
const inputSpan = document.querySelector(".input > span");
const calcSpan = document.querySelector(".calculation > span");

buttons.forEach((button) =>
	button.addEventListener("click", () => {
		handleButton(button.attributes["data-button"].value);
		updateInputSpan();

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
		default:
			break;
	}
}

// ! BUTTON HANDLERS
function handleNumbers(number) {
	if (Number(input) === 0 || input === "" || isNaN(input)) {
		input = number;
	} else if (input.length < 16 && input < Number.MAX_SAFE_INTEGER)
		input += number;
	13;
}

function handleDecimal() {
	console.log(input);
	if (input === "" || isNaN(input)) {
		console.log("inside", input, inputSpan.textContent);
		input = "0.";
	} else {
		input += !input.includes(".") ? "." : "";
	}
}

function handleBackSpace() {
	input = input.slice(0, -1);
}

function handleSignChange() {
	input = input.charAt(0) === "-" ? input.slice(1) : (input = `-${input}`);
}

function evalInput() {}

// Calculate methods
function add(a, b) {
	return a + b;
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
