class Game {
  constructor() {
    this.gameContainer = document.getElementById("game-container");
    this.timeLeftDisplay = document.getElementById("time-left");
    this.scoreDisplay = document.getElementById("score-value");
    this.endGameScreen = document.getElementById("endgame-screen");
    this.finalScoreDisplay = document.getElementById("final-score");
    this.endGameMessage = document.getElementById("endgame-message");
    this.splashScreen = document.getElementById("splash-screen");
    this.restartGameBtn = document.getElementById("restart-button");
    this.jerryLives_value = document.getElementById("lives-value");
    this.winEndscreen = document.getElementById("win-endscreen");
    this.loseTimerEndScreen = document.getElementById("lose-timer-endscreen");
    this.loseCatchEndScreen = document.getElementById("lose-catch-endscreen");
    this.startSound = document.getElementById("start-sound");
    this.collectCheeseSound = document.getElementById("collect-cheese-sound");
    this.jerryScreamSound = document.getElementById("jerry-scream-sound");
    this.jerryWinSound = document.getElementById("jerry-win-sound");
    this.tomCatchSound = document.getElementById("tom-catch-sound");
    this.muteButton = document.getElementById("mute-button");
    this.restartGameBtn.addEventListener("click", () => {
      this.restartGame();
    });
    this.muteButton.addEventListener("click", () => {
      this.muteGame();
    });
    this.timeLeft = 25;
    this.score = 0;
    this.timer;
    this.winScore = 10;
    this.jerryLives = 3;
    this.mouse = null;
    this.cheese = null;
    this.obstacle = null;
    this.obstacleTimer;
    this.isMuted = false;
    this.jerryWinSound.volume = 0.07;
    this.startSound.volume = 0.05;
    this.collectCheeseSound.volume = 0.4;
    this.tomCatchSound.volume = 0.06;
  }

  initialize() {
    // const containerWidth =
    //   document.getElementById("game-container").offsetWidth;
    // const containerHeight =
    //   document.getElementById("game-container").offsetHeight;
    const containerWidth = 1300;
    const containerHeight = 600;
    console.log(`1offset+ ${containerWidth}`);
    this.mouse = new Mouse(containerWidth, containerHeight, 100);
    this.cheese = new Cheese(containerWidth, containerHeight);
    this.obstacle = new Obstacle(
      this.gameContainer,
      containerWidth,
      containerHeight
    );
    this.startListeners();
  }

  startListeners() {
    document.addEventListener("keydown", (event) => {
      // Left arrow key
      if (event.key === "ArrowLeft") {
        this.mouse.moveLeft();
      }
      // Right arrow key
      else if (event.key === "ArrowRight") {
        this.mouse.moveRight();
      }
      // Up arrow key
      else if (event.key === "ArrowUp") {
        this.mouse.moveUp();
      }
      // Down arrow key
      else if (event.key === "ArrowDown") {
        this.mouse.moveDown();
      }

      // Update mouse position and animation
      this.updateMousePosition();
    });
  }

  playStartSound() {
    this.startSound.play();
    //this.startSound.volume = 0.2;
  }

  endStartSound() {
    this.startSound.pause();
    this.startSound.currentTime = 0;
  }

  // Call playStartSound() when the game starts

  startGame() {
    // Start the game
    // this.initialize();
    if (!this.isMuted) {
      this.playStartSound();
    }

    this.gameContainer.style.display = "flex";
    this.splashScreen.style.display = "none";
    this.scoreDisplay.textContent = this.score;
    this.jerryLives_value.textContent = this.jerryLives;
    this.timeLeft = 25;
    this.timeLeftDisplay.textContent = this.timeLeft;
    // this.mouse.updatePosition();
    this.cheese.generateRandomPosition();
    // this.timer = setInterval(this.countdown(), 2000);
    this.timer = setInterval(() => {
      this.countdown();
      //  this.cheese.generateRandomPosition();
    }, 1000);
    this.obstacleTimer = setInterval(() => {
      this.obstacle.generateRandomPosition(); // Generate obstacles
      //  this.cheese.generateRandomPosition();
    }, 2000);
    // setInterval(this.obstacle.generateRandomPosition(), 2000);
  }

  endGame(message) {
    // End the game
    if (!this.isMuted) {
      this.endStartSound();
    }
    clearInterval(this.timer); // Stop the timer
    clearInterval(this.obstacleTimer);
    this.gameContainer.style.display = "none"; // Hide the game container
    this.endGameScreen.style.display = "flex"; // Show the endgame screen
    this.finalScoreDisplay.textContent = this.score; // Display the final score
    this.endGameMessage.textContent = message; // Display the win/lose message
  }

  countdown() {
    this.timeLeft--;
    this.timeLeftDisplay.textContent = this.timeLeft;
    console.log(`time left+${this.timeLeft}`);
    let message = "";
    if (this.timeLeft === 0) {
      clearInterval(this.timer);
      clearInterval(this.obstacleTimer);
      if (this.jerryLives > 0 && this.score >= this.winScore) {
        message = "Congratulations! You won!";
        this.winEndscreen.style.display = "flex";
        if (!this.isMuted) {
          this.jerryWinSound.play();
          //  this.jerryWinSound.voulume = 0.04;
        }
      } else if (this.jerryLives > 0) {
        message = "Time's up! Try Again! Collect at least 10 cheeses to Win";
        this.loseTimerEndScreen.style.display = "flex";
        if (!this.isMuted) {
          this.jerryWinSound.play();
          //this.jerryWinSound.voulume = 0.04;
          this.jerryWinSound.currentTime = 0;
        }
      } else {
        message = "Jerry ran out of lives! Sorry You Lose!";
        this.loseCatchEndScreen.style.display = "flex";
        console.log("lose in else");
        if (!this.isMuted) {
          this.jerryWinSound.play();
          // this.jerryWinSound.voulume = 0.04;
          this.jerryWinSound.currentTime = 0;
        }
      }

      this.endGame(message);
    }
  }

  checkCollision() {
    const mouseRect = this.mouse.element.getBoundingClientRect();
    const cheeseRect = this.cheese.cheeseElement.getBoundingClientRect();
    if (
      mouseRect.left < cheeseRect.right &&
      mouseRect.right > cheeseRect.left &&
      mouseRect.top < cheeseRect.bottom &&
      mouseRect.bottom > cheeseRect.top
    ) {
      if (!this.isMuted) {
        this.collectCheeseSound.play();
      }
      this.score++;
      this.scoreDisplay.textContent = this.score;
      this.cheese.generateRandomPosition();
    }
    // Check collision with obstacles
    const obstacles = document.getElementsByClassName("obstacle");
    console.log(`obstacle + ${obstacles.length}`);
    Array.from(obstacles).forEach((obstacle) => {
      const obstacleRect = obstacle.getBoundingClientRect();
      if (
        mouseRect.left < obstacleRect.right &&
        mouseRect.right > obstacleRect.left &&
        mouseRect.top < obstacleRect.bottom &&
        mouseRect.bottom > obstacleRect.top
      ) {
        obstacle.remove();
        if (!this.isMuted) {
          this.tomCatchSound.play();
        }
        this.loseLife();
      }
    });
  }

  updateMousePosition() {
    this.checkCollision();
  }

  loseLife() {
    this.jerryLives--;

    if (this.jerryLives > 0) {
      // Update UI to reflect remaining lives
      this.jerryLives_value.textContent = this.jerryLives;
    } else {
      this.endGame("Jerry ran out of lives! Sorry You Lose!");
      this.loseCatchEndScreen.style.display = "flex";
      if (!this.isMuted) {
        this.jerryWinSound.play();
        // this.jerryWinSound.voulume = 0.04;
        this.jerryWinSound.currentTime = 0;
      }
    }
  }

  restartGame() {
    // Reset game state
    this.score = 0;
    this.timeLeft = 25;
    this.jerryLives = 3;
    if (!this.isMuted) {
      this.playStartSound();
      this.jerryWinSound.pause();
      this.jerryWinSound.currentTime = 0;
    }

    // Update UI
    this.scoreDisplay.textContent = this.score;
    this.timeLeftDisplay.textContent = this.timeLeft;
    this.jerryLives_value.textContent = this.jerryLives;

    // Restart game
    this.gameContainer.style.display = "flex"; // Show the game container
    this.endGameScreen.style.display = "none"; // Hide the endgame screen
    this.loseTimerEndScreen.style.display = "none";
    this.loseCatchEndScreen.style.display = "none";
    this.winEndscreen.style.display = "none";
    this.cheese.generateRandomPosition();
    this.timer = setInterval(() => {
      this.countdown();
    }, 1000);
    this.obstacleTimer = setInterval(() => {
      this.obstacle.generateRandomPosition(); // Generate obstacles
    }, 2000);
  }

  muteGame() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.startSound.pause();
      this.collectCheeseSound.pause();
      this.jerryScreamSound.pause();
      this.jerryWinSound.pause();
    } else {
      this.startSound.play();
      // this.startSound.volume = 0.2;
      this.collectCheeseSound.play();
      this.jerryScreamSound.play();

      this.jerryWinSound.play();
    }
  }
}
