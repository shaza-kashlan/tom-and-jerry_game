class Cheese {
  constructor(containerWidth, containerHeight) {
    this.cheeseElement = document.getElementById("cheese");
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
  }

  generateRandomPosition() {
    const cheeseWidth = this.cheeseElement.offsetWidth;
    const cheeseHeight = this.cheeseElement.offsetHeight;

    const maxX = this.containerWidth - cheeseWidth;
    const maxY = this.containerHeight - cheeseHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    this.cheeseElement.style.left = randomX + "px";
    this.cheeseElement.style.top = randomY + "px";
  }

  getPosition() {
    return {
      x: parseInt(this.cheeseElement.style.left),
      y: parseInt(this.cheeseElement.style.top),
    };
  }
}
