// GAME BOARD FUNCTION
function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }
  const getBoard = () => board;
  const setMark = (index, player) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    if (board[row][col].getValue() !== "") return;
    board[row][col].setValue(player);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };
  return { setMark, getBoard, printBoard };
}

// CELL FUNCTION
function Cell() {
  let value = "";
  const setValue = (player) => {
    value = player;
  };
  const getValue = () => value;
  return { setValue, getValue };
}

// GAME CONTROLLER FUNCTION
function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = GameBoard();

  const player = [
    {
      name: playerOneName,
      mark: "X",
    },
    {
      name: playerTwoName,
      mark: "O",
    },
  ];

  let activePlayer = player[0];
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (index) => {
    board.setMark(index, getActivePlayer().mark);
    printNewRound();
    switchPlayerTurn();
  };
  printNewRound();
  return { playRound, getActivePlayer, getBoard: board.getBoard };
}
const game = GameController();

// SCREEN CONTROLLER FUNCTION
function ScreenController() {
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    boardDiv.textContent = "";
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    playerTurnDiv.textContent = `${activePlayer.name}'s turn`;

    board.forEach((rows, rowIndex) => {
      rows.forEach((cell, colIndex) => {
        const cellDiv = document.createElement("div");
        isEmpty = cell.getValue() === "";
        cellDiv.textContent = cell.getValue();
        cellDiv.classList.add(
          "cell",
          "flex",
          "items-center",
          "justify-center",
          "text-center",
          "text-3xl",
          "border",
          "border-black",
          "cursor-pointer",
          "bg-gray-400",
          "w-full",
          "h-full",
          isEmpty ? "cursor-pointer" : "cursor-default"
        );
        const flatIndex = rowIndex * 3 + colIndex;
        cellDiv.setAttribute("data-index", flatIndex);
        boardDiv.appendChild(cellDiv);
      });
    });
  };

  function clickHandler(e) {
    const selectedCell = e.target.dataset.index;
    if (!selectedCell) return;

    const index = parseInt(selectedCell);
    const board = game.getBoard();
    const row = Math.floor(index / 3);
    const col = index % 3;
    if (board[row][col].getValue() !== "") return;
    game.playRound(index);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandler);
  updateScreen();
}
ScreenController();
