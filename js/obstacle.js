class Obstacle {
  constructor(container, containerWidth, containerHeight) {
    this.container = container;
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
  }

  generateRandomPosition() {
    const obstacleSize = 40;
    const maxX = this.containerWidth - obstacleSize;
    const maxY = this.containerHeight - obstacleSize;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = randomX + "px";
    obstacle.style.top = randomY + "px";

    this.container.appendChild(obstacle);

    setTimeout(() => {
      obstacle.remove();
    }, 3000);
  }
}
