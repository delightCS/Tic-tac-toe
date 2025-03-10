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
    if (board[index] !== "") return;
    board[index] = player;
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

  const setToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { setToken, getValue };
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
    console.log(`{getActivePlayer().name}'s turn.`);
  };

  const playRound = (index) => {
    board.setMark(index, getActivePlayer().mark);
    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return { playRound, getActivePlayer };
}

const game = GameController();
