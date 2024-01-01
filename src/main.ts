// Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;

document.querySelector("h1")!.innerHTML = gameName;
document.querySelector("footer")!.innerHTML =
  "Guess the word by entering a letter";

// Setting Game Options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;

// Manage Words
let wordToGuess = "";
const words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "Elzero",
  "School",
];

wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

const generateInput = () => {
  const inputsContainer = document.querySelector(".inputs")!;

  // Create Try Div
  for (let i = 1; i <= numberOfTries; ++i) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-inputs");

    // Create Inputs
    for (let j = 1; j <= numberOfLetters; ++j) {
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("maxlength", "1");
      input.setAttribute("id", `guess-${i}-letter-${j}`);
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  }

  (inputsContainer.children[0].children[1] as HTMLInputElement).focus();

  // Disable All Inputs Except First One
  const inputsInDisabledDiv = document.querySelectorAll<HTMLInputElement>(
    ".disabled-inputs input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  // Add Event Listener To Inputs
  const inputs = document.querySelectorAll<HTMLInputElement>("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      nextInput && nextInput.focus();
    });
    input.addEventListener("keydown", function (e) {
      const currentIndex = Array.from(inputs).indexOf(this);
      if (e.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (e.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
};

const guessButton = document.querySelector(".check");
guessButton?.addEventListener("click", handleGuesses);

function handleGuesses() {
  let successGuess = true;
  console.log(wordToGuess);
  for (let i = 1; i <= numberOfLetters; ++i) {
    const input = document.querySelector<HTMLInputElement>(
      `#guess-${currentTry}-letter-${i}`
    )!;
    const letter = input.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    // Game Logic
    if (letter === actualLetter) {
      input.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      input.classList.add("not-in-place");
      successGuess = false;
    } else if (letter === "") successGuess = false;
    else {
      input.classList.add("no");
      successGuess = false;
    }
  }
}

window.onload = () => {
  generateInput();
};
