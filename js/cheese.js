class Cheese {
  constructor(containerWidth, containerHeight) {
    this.cheeseElement = document.getElementById("cheese");
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
  }

  generateRandomPosition() {
    this.cheeseElement.classList.add("appear");
    const cheeseWidth = this.cheeseElement.offsetWidth;
    const cheeseHeight = this.cheeseElement.offsetHeight;

    const maxX = this.containerWidth - cheeseWidth;
    const maxY = this.containerHeight / 2 - cheeseHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY) + this.containerHeight / 2;

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
