const CALC_FUNCTIONS = {
	"+": (a, b) => `${Number(a) + Number(b)}`,
	"-": (a, b) => `${Number(a) - Number(b)}`,
	"×": (a, b) => `${Number(a) * Number(b)}`,
	"/": (a, b) => `${Number(a) / Number(b)}`,
	"%": (a, b) => `${Number(a) % Number(b)}`,
};

const buttons = document.querySelectorAll(".button");
const inputSpan = document.querySelector(".input > span");
const calcSpan = document.querySelector(".calculation > span");

let calculation = "";
let input = "0";
let operatorMode = false;

buttons.forEach((button) =>
	button.addEventListener("click", () => buttonClick(button))
);

function buttonClick(button) {
	handleButton(button.attributes["data-button"].value);
	updateSpan(input, inputSpan, 8);
	updateSpan(calculation, calcSpan, 70);
}

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
		case "Backspace":
			handleBackSpace();
			break;
		case "+/-":
			handleSignChange();
			break;
		case "+":
		case "-":
		case "×":
		case "/":
		case "%":
			handleOperators(buttonValue);
			break;
		case "=":
			handleEval();
			break;
		case "C":
			clearAll();
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

function handleOperators(operator) {
	if (operatorMode) {
		calculation = calculation.slice(0, -1) + operator;
		return;
	}

	if (calculation.length !== 0 && !calculation.includes("=")) {
		const calcArray = calculation.split(" ");
		// Evaluate the existing operator result then append the result plus new operator
		input = evalInput(calculation, input);
	}

	calculation = `${input} ${operator}`;
	operatorMode = true;
}

function handleEval() {
	if (
		operatorMode ||
		!Object.keys(CALC_FUNCTIONS).some((value) => calculation.includes(value))
	)
		return;

	calculation += ` ${input} =`;
	input = evalInput(calculation, input);
	operatorMode = false;
}

function handleSignChange() {
	input = input.charAt(0) === "-" ? input.slice(1) : (input = `-${input}`);
}

function handleBackSpace() {
	input = input.slice(0, -1);
}

function clearAll() {
	calculation = "";
	input = "0";
	operatorMode = false;
}

// * Auxilary Function
function evalInput(calculation, input) {
	const calcArray = calculation.split(" ");
	let eval = CALC_FUNCTIONS[calcArray[1]](calcArray[0], input);
	if (eval.length > 8) eval = Number(eval).toExponential(2).toString();
	return eval;
}

// * UPDATE HTML INPUTS
function updateSpan(input, span, maxLength) {
	const len = input.length;
	// Trim span from left if longer than max length
	span.textContent =
		len < maxLength ? input : `${input}`.substring(len - maxLength);
}

// * Keyboard Support
window.addEventListener("keydown", (event) => {
	let key = event.key;
	switch (key) {
		case "Enter":
			key = "=";
			break;
		case ",":
			key = ".";
			break;
		case "*":
			key = "×";
			break;
		case "Escape":
			key = "C";
			break;
		default:
			break;
	}
	const pressedButton = document.querySelector(`[data-button="${key}"]`);
	if (pressedButton) buttonClick(pressedButton);
});
