const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
}
placeholder(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    //empty message paragraph
    message.innerText = "";
    //grab the entered input
    const guess = guessLetter.value;
    //check to see if it's a single letter
    const goodGuess = validateLetter(guess);
    
    if (goodGuess) {
        makeGuess(guess);
    } 
    guessLetter.value = "";
});

const validateLetter = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText =  "Enter your guess from a-z";  
    } else if (input.length > 1) {
        message.innerText = "Enter ONLY 1 letter";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Enter only characters from a-z"
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase()
    if (guessedLetters.includes(guess)) {
        message.innerText = "You have already guessed this letter. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordinProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordinProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
          revealWord.push(letter.toUpperCase());
        } else {
          revealWord.push("●");
        }
      }
      // console.log(revealWord);
      wordInProgress.innerText = revealWord.join("");
      checkIfPlayerWon();
    };

const checkIfPlayerWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
}