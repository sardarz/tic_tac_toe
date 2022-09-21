import Minimax from "tic-tac-toe-minimax"

export const getWinner = (inputArray) => {
  const array = [];
  for (let i = 0; i < inputArray.length; i += 3) {
    array.push(inputArray.slice(i, i + 3));
  }
  const answers = [];

  for (let i = 0; i < array.length; i++) {
    let row = [];
    let column = [];
    for (let j = 0; j < array.length; j++) {
      row.push(array[i][j]);
      column.push(array[j][i]);
    }
    answers.push(row);
    answers.push(column);
  }
  let leftDiagonal = [];
  let rightDiagonal = [];
  for (let i = 0; i < array.length; i++) {
    leftDiagonal.push(array[i][i]);
    rightDiagonal.push(array[i][2 - i]);
  }
  answers.push(leftDiagonal);
  answers.push(rightDiagonal);

  for (let answer of answers) {
    let [x, y, z] = answer;
    if (x === y && x === z && x) return x;
  }
  return inputArray.filter((x) => x).length === 9 ? "ties" : null;
};


export const makeNextMoveCPU = (boardState, huPlayer, aiPlayer, difficulty) => {
  const symbols = {huPlayer, aiPlayer};
  const {ComputerMove} = Minimax

  let board = [];
  for(let i = 0; i < 9; i++) {
    board.push(i);
  }

  for (let i = 0; i < 9; i++) {
    if (boardState[i] !== null) board[i] = boardState[i]
  }
  const nextMove = ComputerMove(board, symbols, difficulty)
  return nextMove

}