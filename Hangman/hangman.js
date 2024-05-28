const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

//Hardcoding some words in an array to pick up some random words in them of course you can fetch API yo make these arrays of words.
const words = [
  "application",
  "programming",
  "css",
  "interface",
  "html",
  "wizard",
  "javascript",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];

//Show the hidden words
function displayWord() {
  // if the current leter we are lopping through is included in the correctLetters array
  // if correct return the letter else return empty strings
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) => `<span class="letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </span>`
    )
    .join("")}`;

  //if you log the wordEl.innerText in the console it will show every character at a  newline so to get rid of that we are replacing the new line character with the empty string.

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    // Displaying from none to flex
    popup.style.display = "flex";
  }
}

//Updating the wrong letters
function updateWrongLettersEl() {
  // We want to do three thing inside this functions
  //Display wrong letters
  wrongLettersEl.innerHTML = `${wrongLetters.length > 0 ? `<p>Wrong</p>` : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

  // Display parts one by one
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  //check if lost push you lost  notifications

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost.😕";
    popup.style.display = "flex";
  }
}

//show notifications

function showNotification() {
  notification.classList.add("show"); //popup hapens for 2s after that it will fade out

  setTimeout(() => {
    notification.classList.remove("show"); //removing them after 2s or else it will give us some headache later on.
  }, 2000);
}

//key listeners
window.addEventListener("keydown", (e) => {
  // Basicaly we are encouraging fire only when it is an alphabets from a=65 to z=90
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    // The second if statement if to check if the letter is already  entered or not
    // the NOT operator signifies that the letters if not in there do this
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord(); //updating the word element
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});
//Play again event listener

playAgainBtn.addEventListener("click", () => {
  //empty the whole arrays of correct and wrong arrays

  correctLetters.splice(0);
  wrongLetters.splice(0);
  //creating a new random words
  selectedWord = words[Math.floor(Math.random() * words.length)];
  //displaying the random words
  displayWord();
  //updating the wrong letters on to the DOM
  updateWrongLettersEl();
  //turning off the popup
  popup.style.display = "none";
});

//Enabling the same approach for the enter key too
//by enabling the playagainbtn and capturing its click event in before event listener.

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    playAgainBtn.click();
  }
});
displayWord();
