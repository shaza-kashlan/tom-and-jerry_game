window.onload = function () {
  const mouse = document.getElementById("mouse");
  const cheese = document.getElementById("cheese");
  const timeLeftDisplay = document.getElementById("time-left");
  const scoreDisplay = document.getElementById("score-value");
  const startGameBtn = document.getElementById("start-button");
  const gameContainer = document.getElementById("game-container");
  const splashScreen = document.getElementById("splash-screen");
  const endGameScreen = document.getElementById("endgame-screen");
  const restartGameBtn = document.getElementById("restart-button");
  const finalScoreDisplay = document.getElementById("final-score");
  const endGameMessage = document.getElementById("endgame-message");

  let timeLeft = 10;
  let score = 0;
  let timer;
  let mouseX = 0;
  let mouseY = 0;
  let mouseSpeed = 100;
  let winScore = 4;
  let jerryLives = 3;

  // Generate a random position for the cheese
  function generateRandomPosition() {
    const containerWidth =
      document.getElementById("game-container").offsetWidth;
    const containerHeight =
      document.getElementById("game-container").offsetHeight;

    const cheeseWidth = cheese.offsetWidth;
    const cheeseHeight = cheese.offsetHeight;

    const maxX = containerWidth - cheeseWidth;
    const maxY = containerHeight - cheeseHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    cheese.style.left = randomX + "px";
    cheese.style.top = randomY + "px";
  }

  // Check if the mouse catches the cheese
  function checkCollision() {
    const mouseRect = mouse.getBoundingClientRect();
    const cheeseRect = cheese.getBoundingClientRect();
    if (
      mouseRect.left < cheeseRect.right &&
      mouseRect.right > cheeseRect.left &&
      mouseRect.top < cheeseRect.bottom &&
      mouseRect.bottom > cheeseRect.top
    ) {
      score++;
      scoreDisplay.textContent = score;
      generateRandomPosition();
    }

    // Check collision with obstacles
    const obstacles = document.getElementsByClassName("obstacle");
    Array.from(obstacles).forEach((obstacle) => {
      const obstacleRect = obstacle.getBoundingClientRect();
      if (
        mouseRect.left < obstacleRect.right &&
        mouseRect.right > obstacleRect.left &&
        mouseRect.top < obstacleRect.bottom &&
        mouseRect.bottom > obstacleRect.top
      ) {
        loseLife();
      }
    });
  }

  // Countdown timer function
  function countdown() {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;
    let message = "";
    if (timeLeft === 0) {
      clearInterval(timer);

      if (jerryLives > 0 && score >= winScore) {
        message = "Congratulations! You won!";
      } else if (jerryLives > 0) {
        message = "Time's up! Try Again!";
      } else {
        message = "Game Over! Jerry ran out of lives.";
      }
      endGame(message);
    }
  }

  // Update mouse position and animation
  function updateMousePosition() {
    mouse.style.left = mouseX - mouse.offsetWidth / 2 + "px";
    mouse.style.top = mouseY - mouse.offsetHeight / 2 + "px";
    checkCollision();
    if (mouseX !== -1) {
      mouse.classList.add("running");
    } else {
      mouse.classList.remove("running");
    }
  }

  // Function to generate obstacles
  function generateObstacle() {
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");

    const containerWidth = gameContainer.offsetWidth;
    const containerHeight = gameContainer.offsetHeight;

    const obstacleSize = 30;
    const maxX = containerWidth - obstacleSize;
    const maxY = containerHeight - obstacleSize;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    obstacle.style.left = randomX + "px";
    obstacle.style.top = randomY + "px";

    gameContainer.appendChild(obstacle);

    setTimeout(() => {
      obstacle.remove();
    }, 3000);
  }

  // Keyboard arrow key event listener
  document.addEventListener("keydown", function (event) {
    // Left arrow key
    if (event.key === "ArrowLeft") {
      mouseX -= mouseSpeed;
      mouse.style.transform = "scaleX(-1)"; // Flip mouse image horizontally
    }
    // Right arrow key
    else if (event.key === "ArrowRight") {
      mouseX += mouseSpeed;
      mouse.style.transform = "scaleX(1)"; // Reset mouse image orientation
    }
    // Up arrow key
    else if (event.key === "ArrowUp") {
      mouseY -= mouseSpeed;
    }
    // Down arrow key
    else if (event.key === "ArrowDown") {
      mouseY += mouseSpeed;
    }

    // Ensure the mouse stays within the game container
    mouseX = Math.max(
      0,
      Math.min(mouseX, document.getElementById("game-container").offsetWidth)
    );
    mouseY = Math.max(
      0,
      Math.min(mouseY, document.getElementById("game-container").offsetHeight)
    );

    // Update mouse position and animation
    updateMousePosition();
  });

  // Start the game
  function startGame() {
    gameContainer.style.display = "flex";
    splashScreen.style.display = "none";
    score = 0;
    jerryLives = 3;
    scoreDisplay.textContent = score;
    timeLeft = 10;
    timeLeftDisplay.textContent = timeLeft;
    generateRandomPosition();
    timer = setInterval(countdown, 1000);
    setInterval(generateObstacle, 2000);
  }

  function endGame(message) {
    clearInterval(timer); // Stop the timer
    gameContainer.style.display = "none"; // Hide the game container
    endGameScreen.style.display = "block"; // Show the endgame screen
    finalScoreDisplay.textContent = score; // Display the final score
    endGameMessage.textContent = message; // Display the win/lose message
  }

  function loseLife() {
    jerryLives--;

    // Update the UI to reflect remaining lives
    if (jerryLives >= 0) {
      // Update UI to reflect remaining lives
      console.log("Remaining lives: " + jerryLives);
    } else {
      endGame("Game Over! Jerry ran out of lives.");
    }
  }

  // Restart button event listener
  restartGameBtn.addEventListener("click", function () {
    // Reset game state
    score = 0;
    timeLeft = 10;
    jerryLives = 3;
    // Update UI
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;

    // Restart game
    gameContainer.style.display = "flex"; // Show the game container
    endGameScreen.style.display = "none"; // Hide the endgame screen
    generateRandomPosition(); // Generate initial cheese position
    timer = setInterval(countdown, 1000); // Restart the timer
  });

  startGameBtn.addEventListener("click", function () {
    console.log("starting");
    startGame();
  });
};
