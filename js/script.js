window.onload = function () {
  const game = new Game();
  const startGameBtn = document.getElementById("start-button");
  //script.initialize();
  game.initialize();
  startGameBtn.addEventListener("click", () => {
    game.startGame();
  });
};
