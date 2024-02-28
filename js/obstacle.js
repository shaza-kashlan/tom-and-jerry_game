class Obstacle {
  constructor(container, containerWidth, containerHeight) {
    this.container = container;
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
  }

  generateRandomPosition() {
    const obstacleSize = 40;
    const maxX = this.containerWidth - obstacleSize;
    const maxY = this.containerHeight / 2 - obstacleSize;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY) + this.containerHeight / 2;

    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = randomX + "px";
    obstacle.style.top = randomY + "px";

    // Generate a random number between 1 and 5 for the obstacle image
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    console.log(randomNumber);
    // Set the background image based on the random number
    obstacle.style.backgroundImage = `url('/images/obstacle${randomNumber}.png')`; // Adjust the image names as needed

    this.container.appendChild(obstacle);

    if (randomNumber === 3 || randomNumber === 4) {
      obstacle.classList.add("runningObstacleRight");
    } else {
      obstacle.classList.add("runningObstacleLeft");
    }

    setTimeout(() => {
      obstacle.remove();
    }, 4000);
  }
}
