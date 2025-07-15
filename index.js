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

  return { setMark, getBoard };
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

  const setPlayerNames = (name1, name2) => {
    player[0].name = name1;
    player[1].name = name2;
  };

  let activePlayer = player[0];
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
  };
  const getActivePlayer = () => activePlayer;

  const resetActivePlayer = () => {
    activePlayer = player[0];
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

    switchPlayerTurn();
  };

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    checkWin,
    checkDraw,
    setPlayerNames,
    resetActivePlayer,
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

        if (!isEmpty) {
          const img = document.createElement("img");
          img.src =
            cell.getValue() === "X" ? "mark/close.svg" : "mark/circle.svg";
          img.alt = cell.getValue();
          img.classList.add("w-16", "h-16");
          cellDiv.appendChild(img);
        }
        cellDiv.classList.add(
          "cell",
          "flex",
          "items-center",
          "justify-center",
          "rounded-lg",
          "text-center",
          "font-bold",
          "text-5xl",
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

  // Handles the click event on the game board
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

  // Handles the dialog for player names
  const dialog = document.querySelector("dialog");
  dialog.showModal();

  const playerForm = document.querySelector("form");
  playerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const playerOneName = document.querySelector("#playerOne").value;
    const playerTwoName = document.querySelector("#playerTwo").value;
    game.setPlayerNames(playerOneName, playerTwoName);
    dialog.close();
    updateScreen();
  });

  const resetButton = document.querySelector(".resetButton");
  resetButton.addEventListener("click", () => {
    game.getBoard().forEach((row) => row.forEach((cell) => cell.setValue("")));
    const winnerName = document.querySelector(".winner");
    winnerName.textContent = "";
    game.resetActivePlayer();
    updateScreen();
  });
}
ScreenController();
