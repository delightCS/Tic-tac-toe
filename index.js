function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];

    for (let j = 0; j < columns; j++) {
      board[i].push();
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
