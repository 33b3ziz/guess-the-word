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
};

window.onload = () => {
  generateInput();
};
