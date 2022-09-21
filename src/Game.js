import React, { useEffect, useRef, useState, useContext } from "react";
import logo from "./assets/logo.svg";
import restartIcon from "./assets/icon-restart.svg";
import { ReactComponent as ICON_X_SMALL } from "./assets/icon-x-small.svg";
import { ReactComponent as ICON_O_SMALL } from "./assets/icon-o-small.svg";
import { ReactComponent as ICON_X } from "./assets/icon-x.svg";
import { ReactComponent as ICON_O } from "./assets/icon-o.svg";
import { ReactComponent as ICON_X_OUTLINE } from "./assets/icon-x-outline.svg";
import { ReactComponent as ICON_O_OUTLINE } from "./assets/icon-o-outline.svg";
import WinnerModal from "./WinnerModal";
import RestartModal from "./RestartModal";
import PlayerContext from "./PlayerContext";
import { useSearchParams } from "react-router-dom";
import Minimax from "tic-tac-toe-minimax"


const Game = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameEnd, setGameEnd] = useState(false)
  
  const { firstPlayerMark } = useContext(PlayerContext);
  let isVersusCPU = Boolean(searchParams.get("isVersusCPU"));
  
  const {ComputerMove} = Minimax
  
  const huPlayer = firstPlayerMark
  const aiPlayer = firstPlayerMark === "X" ? "O" : "X";
  const symbols = {huPlayer, aiPlayer};
  const difficulty = "Normal" // Easy, Normal, Hard;
  
  const makeNextMoveCPU = (boardState) => {

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

  useEffect(() => {
    if (isVersusCPU && getWinner(boardState) === null) {
      if(currentPlayer !== aiPlayer) return
      let move = makeNextMoveCPU(boardState);
      if (boardState.filter(x => x).length < 9) {
        const arr = Array.from(boardRef.current.children)
          arr[move].click()
      }

    }
  })





  const [boardState, setBoardState] = useState(new Array(9).fill(null));
  const [score, setScore] = useState({ x: 0, ties: 0, o: 0 });
  const [showRestart, setShowRestart] = useState(false);
  const boardRef = useRef(null);

  const getWinner = (inputArray) => {
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

  const updateWinnerScore = (w) => {
    if (w === "X") setScore({ ...score, x: score.x + 1 });
    if (w === "O") setScore({ ...score, o: score.o + 1 });
    if (w === "ties") setScore({ ...score, ties: score.ties + 1 });
    setBoardState(new Array(9).fill(null));
    setCurrentPlayer("X");
    boardRef.current.classList.remove("current-o");
    boardRef.current.classList.add("current-x");
  };

  const checkCell = (evt) => {
    const currentCell = evt.target;
    const gameBoard = Array.from(evt.currentTarget.children);
    const currentIdx = gameBoard.findIndex((el) => el === currentCell);
    if (boardState[currentIdx] !== null) return;
    // change icon cell on hover
    if (currentPlayer === "X") {
      evt.currentTarget.classList.remove("current-x");
      evt.currentTarget.classList.add("current-o");
    } else if (currentPlayer === "O") {
      evt.currentTarget.classList.remove("current-o");
      evt.currentTarget.classList.add("current-x");
    }
    let newGameBoard = boardState.slice();
    newGameBoard[currentIdx] = currentPlayer;
    let newPlayer = currentPlayer === "X" ? "O" : "X";
    setCurrentPlayer(newPlayer);
    setBoardState(newGameBoard);

  };

  return (
    <main className="game">
      <div className="container">
        <div className="game-content">
          <div className="game-header">
            <div className="game-logo">
              <img src={logo} alt="" />
            </div>
            <div className="game-turn">
              <div className="game-turn-icon-wrapper">
                {currentPlayer === "X" ? <ICON_X_SMALL /> : <ICON_O_SMALL />}
              </div>
              <p>turn</p>
            </div>
            <div
              className="game-restart"
              onClick={() => {
                setShowRestart(true);
              }}
            >
              <img src={restartIcon} alt="" />
            </div>
          </div>

          <div
            className="game-board current-x"
            ref={boardRef}
            onClick={checkCell}
          >
            {boardState.map((cell, idx) => {
              return (
                <div
                  key={idx}
                  className={`game-cell ${cell === null ? "empty-cell" : ""}`}
                >
                  {boardState[idx] === "X" ? (
                    <ICON_X />
                  ) : boardState[idx] === "O" ? (
                    <ICON_O />
                  ) : (
                    ""
                  )}
                  <ICON_O_OUTLINE />
                  <ICON_X_OUTLINE />
                </div>
              );
            })}
          </div>

          <div className="game-stats">
            <div className="game-stats-x">
              {isVersusCPU ? (
                <p>
                  x <span>{firstPlayerMark === "X" ? "(YOU)" : "(CPU)"}</span>
                </p>
              ) : (
                <p>
                  x <span>{firstPlayerMark === "X" ? "(P1)" : "(P2)"}</span>
                </p>
              )}

              <div className="game-stat-output">{score.x}</div>
            </div>
            <div className="game-stats-tie">
              <p>ties</p>
              <div className="game-stat-output">{score.ties}</div>
            </div>
            <div className="game-stats-o">
              {isVersusCPU ? (
                <p>
                  o <span>{firstPlayerMark === "O" ? "(YOU)" : "(CPU)"}</span>
                </p>
              ) : (
                <p>
                  o <span>{firstPlayerMark === "O" ? "(P1)" : "(P2)"}</span>
                </p>
              )}
              <div className="game-stat-output">{score.o}</div>
            </div>
          </div>
        </div>
      </div>
      {showRestart ? (
        <RestartModal
          closeModal={() => setShowRestart(false)}
          restartGame={() => setScore({ x: 0, ties: 0, o: 0 })}
        />
      ) : null}

      {getWinner(boardState) !== null ? (
        <WinnerModal
          updateWinnerScore={updateWinnerScore}
          winner={getWinner(boardState)}
        />
      ) : (
        <div></div>
      )}
    </main>
  );
};

export default Game;
