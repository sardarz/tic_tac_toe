import React, { useState } from "react";
import logo from "./assets/logo.svg";
import restartIcon from "./assets/icon-restart.svg";
import { ReactComponent as ICON_X_SMALL } from "./assets/icon-x-small.svg";
import { ReactComponent as ICON_X } from "./assets/icon-x.svg";
import { ReactComponent as ICON_O } from "./assets/icon-o.svg";
import { ReactComponent as ICON_X_OUTLINE } from "./assets/icon-x-outline.svg"
import { ReactComponent as ICON_O_OUTLINE } from "./assets/icon-o-outline.svg"

const Game = () => {

  const checkCell = (evt) => {
    const currentCell = evt.target;
    const gameBoard = Array.from(evt.currentTarget.children);
    const currentIdx = gameBoard.findIndex((el) => el === currentCell);
    if (boardState[currentIdx] !== null) return;

    if (currentPlayer === "X") {
      evt.currentTarget.classList.remove('current-x')
      evt.currentTarget.classList.add('current-o')
    } else if (currentPlayer === "O") {
      evt.currentTarget.classList.remove('current-o')
      evt.currentTarget.classList.add('current-x')
    }
    let newGameBoard = boardState.slice();
    newGameBoard[currentIdx] = currentPlayer;
    let newPlayer = currentPlayer === "X" ? "O" : "X";
    setCurrentPlayer(newPlayer);
    setBoardState(newGameBoard);
  };
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [boardState, setBoardState] = useState(new Array(9).fill(null));

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
            <div className="game-restart" onClick={() => {setBoardState(new Array(9).fill(null))}}>
              <img src={restartIcon} alt="" />
            </div>
          </div>

          <div className="game-board current-x" onClick={checkCell}>
            {boardState.map((cell, idx) => {
              return (
                <div key={idx} className={`game-cell ${cell === null ? "empty-cell" : ""}`}>
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
              <div className="game-stat-output">14</div>
            </div>
            <div className="game-stats-tie">
              <p>ties</p>
              <div className="game-stat-output">32</div>
            </div>
            <div className="game-stats-o">
              <p>
                o <span>(cpu)</span>
              </p>
              <div className="game-stat-output">19</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Game;
