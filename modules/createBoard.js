function createBoard(container, gameboard) {
  container.textContent = "";
  const board = document.createElement("div");
  board.id = "gameboard";
  board.classList.add("flex");
  for (let i = 0; i < gameboard.length; i++) {
    const rows = document.createElement("div");
    for (let j = 0; j < gameboard[i].length; j++) {
      const cols = document.createElement("div");
      cols.setAttribute("data-set", `${j}${i}`);
      cols.classList.add(
        "w-8",
        "h-8",
        "border",
        "flex",
        "items-center",
        "justify-center",
        "cursor-pointer",
      );
      if (gameboard[j][i] === "HIT") {
        cols.classList.add("bg-yellow-500");
        cols.textContent = "H";
      } else if (typeof gameboard[j][i] === "object") {
        cols.classList.add("bg-red-500");
        cols.textContent = "S";
      } else if (gameboard[j][i] === "X") {
        cols.classList.add("bg-gray-800");
        cols.textContent = "X";
      } else {
        cols.textContent = gameboard[j][i];
      }
      rows.append(cols);
    }
    board.append(rows);
  }
  container.append(board);
}

export default createBoard;
