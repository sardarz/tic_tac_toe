import React, { useEffect, useRef, useState, useContext } from "react";
import WinnerModal from "./WinnerModal";
import RestartModal from "./RestartModal";
import PlayerContext from "./PlayerContext";
import { useSearchParams } from "react-router-dom";

import { getWinner, makeNextMoveCPU } from "./helperFunctions";
import GameBoard from "./GameBoard";
import GameStats from "./GameStats";
import GameHeader from "./GameHeader";

const Game = () => {
  const { firstPlayerMark } = useContext(PlayerContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [boardState, setBoardState] = useState(new Array(9).fill(null));
  const [score, setScore] = useState({ x: 0, ties: 0, o: 0 });
  const [showRestart, setShowRestart] = useState(false);
  const boardRef = useRef(null);
  let isVersusCPU = Boolean(searchParams.get("isVersusCPU"));

  const huPlayer = firstPlayerMark;
  const aiPlayer = firstPlayerMark === "X" ? "O" : "X";
  const difficulty = "Normal"; // Easy, Normal, Hard;

  useEffect(() => {
    if (isVersusCPU && getWinner(boardState) === null) {
      if (currentPlayer !== aiPlayer) return;
      let move = makeNextMoveCPU(boardState, huPlayer, aiPlayer, difficulty);
      if (boardState.filter((x) => x).length < 9) {
        const arr = Array.from(boardRef.current.children);
        arr[move].click();
      }
    }
  });

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
          <GameHeader
            currentPlayer={currentPlayer}
            setShowRestart={setShowRestart}
          />
          <GameBoard
            boardRef={boardRef}
            checkCell={checkCell}
            boardState={boardState}
          />
          <GameStats
            isVersusCPU={isVersusCPU}
            score={score}
            firstPlayerMark={firstPlayerMark}
          />
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
