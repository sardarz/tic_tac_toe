import React, { useEffect, useRef, useState } from "react";
import logo from "./assets/logo.svg";
import restartIcon from "./assets/icon-restart.svg";
import { ReactComponent as ICON_X_SMALL } from "./assets/icon-x-small.svg";
import { ReactComponent as ICON_X } from "./assets/icon-x.svg";
import { ReactComponent as ICON_O } from "./assets/icon-o.svg";
import { ReactComponent as ICON_X_OUTLINE } from "./assets/icon-x-outline.svg";
import { ReactComponent as ICON_O_OUTLINE } from "./assets/icon-o-outline.svg";
import WinnerModal from "./WinnerModal";

const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [boardState, setBoardState] = useState(new Array(9).fill(null));
  const [score, setScore] = useState({ x: 0, ties: 0, o: 0 });
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

  // useEffect(() => {
  //   const winner = getWinner(boardState);
  //   if (winner !== null) updateWinnerScore(winner)
  // });

  const checkCell = (evt) => {
    const currentCell = evt.target;
    const gameBoard = Array.from(evt.currentTarget.children);
    const currentIdx = gameBoard.findIndex((el) => el === currentCell);
    if (boardState[currentIdx] !== null) return;

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
                <ICON_X_SMALL />
              </div>
              <p>turn</p>
            </div>
            <div
              className="game-restart"
              onClick={() => {
                setBoardState(new Array(9).fill(null));
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
              <p>
                x <span>(you)</span>
              </p>
              <div className="game-stat-output">{score.x}</div>
            </div>
            <div className="game-stats-tie">
              <p>ties</p>
              <div className="game-stat-output">{score.ties}</div>
            </div>
            <div className="game-stats-o">
              <p>
                o <span>(cpu)</span>
              </p>
              <div className="game-stat-output">{score.o}</div>
            </div>
          </div>
        </div>
      </div>
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
