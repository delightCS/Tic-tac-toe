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

  const checkWin = () => {
    const boardState = board.getBoard();
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      const rowA = Math.floor(a / 3);
      const colA = a % 3;
      const rowB = Math.floor(b / 3);
      const colB = b % 3;
      const rowC = Math.floor(c / 3);
      const colC = c % 3;

      if (
        boardState[rowA][colA].getValue() !== "" &&
        boardState[rowA][colA].getValue() ===
          boardState[rowB][colB].getValue() &&
        boardState[rowA][colA].getValue() === boardState[rowC][colC].getValue()
      ) {
        return true;
      }
    }
    return false;
  };

  const checkDraw = () => {
    const boardState = board.getBoard();
    for (let row of boardState) {
      for (let cell of row) {
        if (cell.getValue() === "") return false;
      }
    }
    return true;
  };

  const playRound = (index) => {
    board.setMark(index, getActivePlayer().mark);

    const winnerName = document.querySelector(".winner");
    if (checkWin()) {
      winnerName.textContent = `${getActivePlayer().name} wins!`;
      return;
    }

    if (checkDraw()) {
      winnerName.textContent = "It's a draw!";
      return;
    }

    printNewRound();
    switchPlayerTurn();
  };

  printNewRound();
  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    checkWin,
    checkDraw,
  };
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
          "rounded-lg",
          "text-center",
          "text-3xl",
          "border",
          "border-black",
          "cursor-pointer",
          "bg-gray-400",
          "w-32",
          "h-32",
          isEmpty ? "cursor-pointer" : "cursor-not-allowed"
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
