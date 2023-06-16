// import { easyWords } from "..words/easy-words";
// import { mediumWords } from "..words/medium-words";
// import { hardWords } from "..words/hard-words";
window.onload = function () {
  // SET IMPORTANT VARIABLES HERE //
  let words = new Words();
  const splashHeader = document.getElementById("splash-header");
  const instructionsButton = document.getElementById("instructions");
  const splashScreen = document.querySelector(".splash-screen");
  const content = document.querySelector(".content");
  let instructionsHTML = "";
  // let endScreen = "";
  let startButton = document.getElementById("start-game");
  let gameScreen = document.querySelector(".game-screen");
  let refreshBack = document.querySelector(".refresh-action");

  let easyWords = words.easyWords;
  let mediumWords = words.mediumWords;
  let hardWords = words.hardWords;
  let allWords = [...easyWords, ...mediumWords, ...hardWords];

  // END IMPORTANT VARIABLES //

  // CREATE FLOATING WORDS BACKGROUND && ITS FUNCTIONS//
  function createWordElement(word) {
    const wordElement = document.createElement("span");
    wordElement.textContent = word;
    wordElement.classList.add("word");
    wordElement.style.color = getRandomColor();
    wordElement.style.transform = getRandomRotation();
    return wordElement;
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  function getRandomRotation() {
    const rotations = ["rotate(0deg)", "rotate(90deg)", "rotate(180deg)"];
    return rotations[Math.floor(Math.random() * rotations.length)];
  }

  function createFloatingWordBackground() {
    const wordBackground = document.querySelector(".word-background");
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    for (let i = 0; i < allWords.length; i++) {
      const word = allWords[i];
      const wordElement = createWordElement(word);

      const xPos = Math.random() * screenWidth;
      const yPos = Math.random() * screenHeight;

      wordElement.style.left = xPos + "px";
      wordElement.style.top = yPos + "px";
      wordBackground.appendChild(wordElement);
    }
  }

  function removeBackGround() {
    const parentNode = document.querySelector(".word-background");
    const spanElements = parentNode.querySelectorAll("span");
    spanElements.forEach((spanElement) => {
      parentNode.removeChild(spanElement);
    });
  }

  createFloatingWordBackground();

  // let backgroundButt = document.getElementById("background-loader");
  refreshBack.addEventListener("click", function () {
    removeBackGround();
    createFloatingWordBackground();
  });
  // backgroundButt.addEventListener("click", function () {
  //   removeBackGround();
  //   createFloatingWordBackground();
  // });

  // END FLOATING WORDS BACKGROUND //

  // HANDLE INSTRUCTIONS CLICK, RELOADING FLOATING WORD BACKGROUND, DESCRIBE SCRAMBLE AND UNSCRAMBLE FXNLITY
  instructionsHTML += `
  <div class = "instructions">
    <h4>Instructions</h4>
    <p>Unscramble as many words as possible to prevent the cat 
    from eating the mouse<p>
    <ul class = "instruction-list">
      <li>Look at the scrambled word<li>
      <li>Try to unscramble it to the original word<li>
      <li>Press enter after unscrambling</li>
      <li>Beat the timer, to save the mouse</li>
      <li>Need Help? The background has words that might be the word you are looking for.</li>
      <li>Enjoy!! and learn new words</li>

    </ul>
    <button id = 'start-game'>Start</button>
    <button id = 'back'> << Go Back</button>
  </div>
`;

  let instButton = document.getElementById("instructions");
  function changeHTML() {
    content.innerHTML = instructionsHTML;
  }

  instButton.addEventListener("click", function () {
    changeHTML();
  });
  scramble();

  setTimeout(() => {
    unscramble();
  }, 4000);

  function showStart() {
    content.style.display = "none";
    gameScreen.style.display = "block";
  }

  startButton.addEventListener("click", function () {
    showStart();
  });
  // let backButton = document.getElementById("back");
  // function revertHTML() {
  //   content.innerHTML = splashContent;
  // }
  // backButton.addEventListener("click", function () {
  //   revertHTML();
  // });

  function scramble() {
    const splashHeader = document.getElementById("splash-header");
    const text = splashHeader.innerText;
    const scrambledText = scrambleText(text);
    splashHeader.innerText = scrambledText; // Come Back
    animateText(splashHeader, scrambledText);
  }

  function unscramble() {
    const splashHeader = document.getElementById("splash-header");
    const text = "Scrambled Words";
    // splashHeader.innerText = text;

    animateText(splashHeader, text);
  }

  function scrambleText(text) {
    let scrambledText = [];
    const wordArray = text.split(" ");

    for (let i = 0; i < wordArray.length; i++) {
      const word = wordArray[i];
      const shuffledWord = shuffleWord(word);
      scrambledText.push(shuffledWord);
    }
    return `${scrambledText[0]} ${scrambledText[1]}`;
  }

  function shuffleWord(word) {
    const shuffledChars = word.split("").sort(() => 0.5 - Math.random());
    // console.log(shuffledChars.join(""));
    return shuffledChars.join("");
  }

  shuffleWord("Scrambled Words");

  function animateText(element, newText) {
    element.innerText = newText;
    element.style.animationName = "scrambleAnimation";
    element.addEventListener("animationend", () => {
      element.style.animationName = "unscrambleAnimation";
    });
  }

  // END //

  let game = new scrambledGame();

  let word = game.setWord(game.getWord());
  let scrambledWord = document.querySelector(".scrambled-word");
  let originalWord = document.querySelector(".original-word");
  let submitWordButton = document.querySelector(".submit-word-button");
  let livesSpan = document.getElementById("lives");
  let tryAgainButton = document.getElementById("again");
  let gameWord = game.word;
  let beginButton = document.getElementById("begin");
  let inputArea = document.getElementById("word-input");
  scrambledWord.innerText = game.scrambleWord(gameWord);
  scrambledWord.innerText = game.scrambleWord(game.word);
  let difficulty = document.getElementById("difficulty");
  let currentLives = parseInt(livesSpan.innerText);

  difficulty.innerText = game.difficulty;
  originalWord.innerText = gameWord;

  // gameLives.innerText = game.lives;

  let shuffleButton = document.querySelector(".shuffle-word-button");

  game.userInput.addEventListener("input", function () {
    // Enable or disable the submit button based on input field value
    if (game.userInput.value.length > 0) {
      submitWordButton.disabled = false;
    } else {
      submitWordButton.disabled = true;
    }
    // submitWordButton.disabled = true;
  });

  // console.log(scrambledWord.innerText);
  // Event Handlers
  function shuffle() {
    const shuffledChars = scrambledWord.innerText
      .split("")
      .sort(() => 0.5 - Math.random());
    // console.log(shuffledChars.join(""));
    return shuffledChars.join("");
  }
  shuffleButton.addEventListener("click", function () {
    scrambledWord.innerHTML = shuffle();
  });

  // console.log(game.this.word);
  console.log(scrambledWord);
  console.log(scrambledWord.innerHTML);
  console.log("this.word:", gameWord);

  submitWordButton.addEventListener("click", function () {
    if (game.compareWords()) {
      submitWordButton.disabled = true;
      scrambledWord.innerText = game.nextScrambledWord();
      setTimeout(() => {
        game.restartTimer();
      }, 100);
      console.log("Correct");
    } else {
      console.log("Wrong, try again!!");
    }
  });

  if (game.lives === 0) {
    game.endGame();
  }

  // if (game.startTimer() === 0) {
  //   tryAgainButton.style.display = "block";
  // }
  beginButton.addEventListener("click", function () {
    beginButton.style.display = "none";
    inputArea.disabled = false;

    game.startTimer();
  });

  tryAgainButton.addEventListener("click", function () {
    tryAgainButton.style.display = "none";
    inputArea.disabled = false;
    // let currentLives = parseInt(livesSpan.innerText);
    currentLives -= 1;
    livesSpan.innerText = currentLives;

    game.startTimer();
    if (currentLives === 0) {
      this.endGame();
    }
  });

  let gamePlay = document.querySelector(".game-play");
  let endScreen = document.querySelector(".end-screen");
};
