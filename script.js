let calculated = "";
let input = "0";

const buttons = document.querySelectorAll(".button");
const inputSpan = document.querySelector(".input > span");
const calcSpan = document.querySelector(".calculation > span");

console.log(buttons);

buttons.forEach((button) =>
	button.addEventListener("click", () => {
		console.log("Pressed", button.textContent);
		calculated = input.trim();
		calcSpan.textContent = calculated;
		input = button.textContent;
		inputSpan.textContent = input;
	})
);

function handleButton(button) {
	switch (button) {
		case 1:
			break;
		default:
			break;
	}
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
