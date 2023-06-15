class scrambledGame {
  constructor() {
    this.word = "";
    this.userInput = document.getElementById("word-input");
    this.livesLeft = 5;
    this.difficulty = "Easy";
    this.value = this.difficulty;
    this.score = 0;
    this.hint = "Some Hint";
    this.gameIsOver = false;
    this.words = new Words();
    this.easyWords = this.words.easyWords;
    this.mediumWords = this.words.mediumWords;
    this.hardWords = this.words.hardWords;
    this.greenCheck = document.querySelector(".green");
    this.redCheck = document.querySelector(".red");
    this.currentScore = document.getElementById("score");
    this.seenWords = [];
    // this.originalWord = document.querySelector(".original-word");
    // this.easyWord = this.getEasyWord;
    // this.hardWord = this.gethHardWord;
    // this.mediumWord = this.getMediumWord;
  }
  // getEasyWord() {
  //   let word = "";
  //   if (this.difficulty === "Easy") {
  //   }
  //   return word;
  // }
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
    // let word = this.getWord();
    // let word = this.word;
    // const shuffledChars = this.word.split("").sort(() => 0.5 - Math.random());
    const shuffledChars = word.split("").sort(() => 0.5 - Math.random());
    // console.log(shuffledChars.join(""));
    return shuffledChars.join("");
  }
  compareWords() {
    if (this.word === this.userInput.value.toLowerCase()) {
      this.score++;
      this.greenCheck.style.display = "block";
      this.currentScore.innerText = `Score: ${this.score}`;
      console.log("Correct");
    } else {
      this.score -= 1;
      console.log("Incorrect");
      return;
    }
    this.userInput.value = "";
    // this.nextScrambledWord();
  }
  nextScrambledWord() {
    let word = this.getWord();
    if (this.seenWords.includes(word)) {
      return;
    }
    this.word = word;
    this.seenWords.push(this.word);
    return this.scrambleWord(this.word);
  }
}
