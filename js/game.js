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
    this.restartGameBtn.addEventListener("click", () => {
      this.restartGame();
    });
    this.timeLeft = 10;
    this.score = 0;
    this.timer;
    this.winScore = 6;
    this.jerryLives = 3;
    this.mouse = null;
    this.cheese = null;
    this.obstacle = null;
    this.obstacleTimer;
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

  startGame() {
    // Start the game
    // this.initialize();
    this.gameContainer.style.display = "flex";
    this.splashScreen.style.display = "none";
    //this.score = 0;
    // this.jerryLives = 3;
    this.scoreDisplay.textContent = this.score;
    this.jerryLives_value.textContent = this.jerryLives;
    this.timeLeft = 10;
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
    clearInterval(this.timer); // Stop the timer
    clearInterval(this.obstacleTimer);
    this.gameContainer.style.display = "none"; // Hide the game container
    this.endGameScreen.style.display = "block"; // Show the endgame screen
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
      } else if (this.jerryLives > 0) {
        message = "Time's up! Try Again!";
      } else {
        message = "Game Over! Jerry ran out of lives.";
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
      this.endGame("Game Over! Jerry ran out of lives.");
    }
  }

  restartGame() {
    // Reset game state
    this.score = 0;
    this.timeLeft = 10;
    this.jerryLives = 3;

    // Update UI
    this.scoreDisplay.textContent = this.score;
    this.timeLeftDisplay.textContent = this.timeLeft;
    this.jerryLives_value.textContent = this.jerryLives;

    // Restart game
    this.gameContainer.style.display = "flex"; // Show the game container
    this.endGameScreen.style.display = "none"; // Hide the endgame screen
    // this.startGame(); // Generate initial cheese position
    this.cheese.generateRandomPosition();
    // this.timer = setInterval(this.countdown(), 2000);
    this.timer = setInterval(() => {
      this.countdown();
    }, 1000);
    this.obstacleTimer = setInterval(() => {
      this.obstacle.generateRandomPosition(); // Generate obstacles
    }, 2000);
  }
}