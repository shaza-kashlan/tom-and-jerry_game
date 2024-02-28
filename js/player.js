class Player {
  constructor(mouseElement, speed) {
    this.mouse = mouseElement;
    this.mouseSpeed = speed;
    this.mouseX = 0;
    this.mouseY = 0;
  }

  updatePosition(x, y) {
    this.mouseX = x;
    this.mouseY = y;
    this.mouse.style.left = this.mouseX - this.mouse.offsetWidth / 2 + "px";
    this.mouse.style.top = this.mouseY - this.mouse.offsetHeight / 2 + "px";
  }

  moveLeft() {
    this.mouseX -= this.mouseSpeed;
    this.mouse.style.transform = "scaleX(-1)";
    this.updatePosition(this.mouseX, this.mouseY);
  }

  moveRight() {
    this.mouseX += this.mouseSpeed;
    this.mouse.style.transform = "scaleX(1)";
    this.updatePosition(this.mouseX, this.mouseY);
  }

  moveUp() {
    this.mouseY -= this.mouseSpeed;
    this.updatePosition(this.mouseX, this.mouseY);
  }

  moveDown() {
    this.mouseY += this.mouseSpeed;
    this.updatePosition(this.mouseX, this.mouseY);
  }
}
