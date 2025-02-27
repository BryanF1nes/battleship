function createBoard(container, gameboard, player) {
  container.innerHTML = "";

  const board = document.createElement("div");
  board.id = `${player}-gameboard`;
  board.classList.add("grid", "grid-cols-10", "gap-1");

  for (let i = 0; i < gameboard.length; i++) {
    for (let j = 0; j < gameboard[i].length; j++) {
      const cell = document.createElement("div");
      cell.setAttribute("data-set", `${i}-${j}`);
      cell.classList.add(
        "w-8",
        "h-8",
        "border",
        "flex",
        "items-center",
        "justify-center",
        "cursor-pointer"
      );

      if (gameboard[i][j] === "HIT") {
        cell.classList.add("bg-yellow-500");
        cell.textContent = "H";
      } else if (gameboard[i][j] === "X") {
        cell.classList.add("bg-gray-800");
        cell.textContent = "X";
      } else if (typeof gameboard[i][j] === "object") {
        if (player === `ai`) {
          cell.classList.add("bg-blue-100");
        } else {
          cell.classList.add("bg-red-500"); 
          cell.textContent = "";
        }
      } else {
        cell.classList.add("bg-blue-100");
      }

      board.append(cell);
    }
  }

  container.append(board);
}

export default createBoard;