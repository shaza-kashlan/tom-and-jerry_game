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

    this.container.appendChild(obstacle);
    //obstacle.classList.add("appear");

    setTimeout(() => {
      obstacle.remove();
    }, 4000);
  }
}
