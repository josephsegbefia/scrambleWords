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
  let startButton = document.getElementById("start-game");
  let gameScreen = document.querySelector(".game-screen");

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

  let backgroundButt = document.getElementById("background-loader");
  backgroundButt.addEventListener("click", function () {
    removeBackGround();
    createFloatingWordBackground();
  });

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
};
