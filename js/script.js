window.onload = function () {
  const mouse = document.getElementById("mouse");
  const cheese = document.getElementById("cheese");
  const timeLeftDisplay = document.getElementById("time-left");
  const scoreDisplay = document.getElementById("score-value");
  const startGameBtn = document.getElementById("start-button");
  const gameContainer = document.getElementById("game-container");
  const splashScreen = document.getElementById("splash-screen");

  let timeLeft = 30;
  let score = 0;
  let timer;
  let mouseX = 0;
  let mouseY = 0;
  let mouseSpeed = 100; // Initial speed of mouse movement

  // Generate a random position for the cheese within the game container
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
  }

  function moveMouseTowardsCheese() {
    const mouseRect = mouse.getBoundingClientRect();
    const cheeseRect = cheese.getBoundingClientRect();

    const dx = cheeseRect.left - mouseRect.left;
    const dy = cheeseRect.top - mouseRect.top;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > mouseSpeed) {
      const angle = Math.atan2(dy, dx);
      const mx = mouseRect.left + mouseSpeed * Math.cos(angle);
      const my = mouseRect.top + mouseSpeed * Math.sin(angle);
      mouse.style.left = mx + "px";
      mouse.style.top = my + "px";
    } else {
      // Mouse reached cheese
      score++;
      document.getElementById("score").textContent = score;
      generateRandomPosition();
    }
  }

  // Countdown timer function
  function countdown() {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      endGame();
    }
  }

  // End the game
  function endGame() {
    clearInterval(timer);
    alert(`Game Over! Your score: ${score}`);
  }

  // Update mouse position and animation
  function updateMousePosition() {
    mouse.style.left = mouseX - mouse.offsetWidth / 2 + "px";
    mouse.style.top = mouseY - mouse.offsetHeight / 2 + "px";
    // if (mouseX !== 0) {
    //   mouse.classList.add("running");
    // } else {
    //   mouse.classList.remove("running");
    // }
    checkCollision();
    mouse.classList.add("running");
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
    scoreDisplay.textContent = score;
    timeLeft = 10;
    timeLeftDisplay.textContent = timeLeft;
    generateRandomPosition();
    timer = setInterval(countdown, 1000);
    //timer = setInterval(moveMouseTowardsCheese, 50); // A
  }

  startGameBtn.addEventListener("click", function () {
    console.log("starting");
    startGame();
  });
};
