class Mouse {
  constructor(containerWidth, containerHeight, speed) {
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
    this.speed = speed;
    this.element = document.getElementById("mouse");
    this.x = 0;
    this.y = 0;
    this.isRunning = false;
  }

  moveLeft() {
    this.x -= this.speed;
    this.element.style.transform = "scaleX(-1)"; // Flip mouse image horizontally
    this.updatePosition();
  }

  moveRight() {
    this.x += this.speed;
    this.element.style.transform = "scaleX(1)";
    this.updatePosition();
  }

  moveUp() {
    this.y -= this.speed;
    this.updatePosition();
  }

  moveDown() {
    this.y += this.speed;
    this.updatePosition();
  }

  updatePosition() {
    // Ensure the mouse stays within the game container
    this.x = Math.max(
      0,
      Math.min(this.x, this.containerWidth - this.element.offsetWidth)
    );
    this.y = Math.max(
      0,
      Math.min(this.y, this.containerHeight - this.element.offsetHeight)
    );

    // Update the position of the mouse element
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";

    // Toggle the running class based on the speed
    if (this.speed > 0) {
      this.element.classList.add("running");
    } else {
      this.element.classList.remove("running");
    }
  }
}
