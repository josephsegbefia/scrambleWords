class scrambledGame {
  constructor() {
    this.word = "";
    this.userInput = document.getElementById("word-input");
    this.difficulty = "Easy";
    // this.value = this.difficulty;
    this.score = document.getElementById("score").innerText;
    this.lives = document.getElementById("lives").innerText;
    this.hint = "Some Hint";
    this.gameIsOver = false;
    this.words = new Words();
    this.easyWords = this.words.easyWords;
    this.mediumWords = this.words.mediumWords;
    this.hardWords = this.words.hardWords;
    this.greenCheck = document.querySelector(".green");
    this.redCheck = document.querySelector(".red");
    this.currentScore = document.getElementById("score");
    this.endScreen = document.getElementById("end-screen");
    this.seenWords = [];
    this.gamePlay = document.querySelector(".game-play");
    this.countDownDuration = null;
    this.intervalID = null;
    this.startTime = new Date().getTime();
    this.tryAgainButton = document.getElementById("again");
  }

  getWord() {
    let word = "";
    if (this.difficulty === "Medium") {
      let genWord =
        this.mediumWords[Math.floor(Math.random() * this.mediumWords.length)];
      word += genWord;
    } else if (this.difficulty === "Easy") {
      let genWord =
        this.easyWords[Math.floor(Math.random() * this.easyWords.length)];
      word += genWord;
    } else {
      let genWord =
        this.hardWords[Math.floor(Math.random() * this.hardWords.length)];
      word += genWord;
    }
    // this.seenWords.push(word);
    return word;
  }

  setWord(word) {
    this.word = word;
  }
  scrambleWord(word) {
    const shuffledChars = word.split("").sort(() => 0.5 - Math.random());
    return shuffledChars.join("");
  }
  compareWords() {
    if (this.word === this.userInput.value.toLowerCase()) {
      this.score++;
      this.greenCheck.style.display = "block";
      this.currentScore.innerText = this.score;
      this.userInput.value = "";
      setTimeout(() => {
        this.greenCheck.style.display = "none";
      }, 1000);
      return true;
    } else if (this.word !== this.userInput.value.toLowerCase()) {
      this.score -= 1;
      this.redCheck.style.display = "block";
      this.currentScore.innerText = `Score: ${this.score}`;
      setTimeout(() => {
        this.redCheck.style.display = "none";
      }, 1000);
      console.log("Incorrect Try again");
      return false;
    }
  }
  nextScrambledWord() {
    let word = this.getWord();
    this.word = word;
    return this.scrambleWord(this.word);
  }
  endGame() {
    this.gamePlay.style.display = "none";
    this.endScreen.style.display = "block";
  }
  startTimer() {
    this.countDownDuration = 0.75 * 60 * 1000;
    this.startTime = new Date().getTime();

    this.intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - this.startTime;
      const remainingTime = this.countDownDuration - elapsedTime;

      if (remainingTime <= 0) {
        clearInterval(this.intervalId);
        document.querySelector(".timer").innerHTML = "Time Up!";
        this.userInput.disabled = true;
        this.tryAgainButton.style.display = "block";
        return;
      }

      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      const countdownElement = document.querySelector(".timer");
      countdownElement.innerHTML = `Time remaining: ${minutes}m ${seconds}s`;
    }, 1000);
    return;
  }

  restartTimer() {
    clearInterval(this.intervalID);
    this.startTimer();
  }
}
