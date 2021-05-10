const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text()
    // console.log(words);
    const wordArray = words.split("\n");
    // console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
}

getWord();

const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        // console.log(letter);
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
        countGuessesRemaining(guess);
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

    const countGuessesRemaining = function (guess) {
        const upperWord = word.toUpperCase();
        if (!upperWord.includes(guess)) {
            message.innerText = `Woops, the word has no letter ${guess}.`;
            remainingGuesses -= 1;
        } else {
            message.innerText = "Good guess!";
        }

        if (remainingGuesses === 0) {
            message.innerHTML = `Uh oh. Game over! The word was <span class="highlight">${word}</span> .`;
            remainingGuessesElement.innerText = "";
        } else if (remainingGuesses === 1) {
            remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
        } else {
            remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
        }
    };

const checkIfPlayerWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
}



