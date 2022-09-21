import React from "react";
import { ReactComponent as ICON_X } from "./assets/icon-x.svg";
import { ReactComponent as ICON_O } from "./assets/icon-o.svg";
import { ReactComponent as ICON_X_OUTLINE } from "./assets/icon-x-outline.svg";
import { ReactComponent as ICON_O_OUTLINE } from "./assets/icon-o-outline.svg";

const GameBoard = ({boardRef, checkCell, boardState}) => {
  return (
    <div className="game-board current-x" ref={boardRef} onClick={checkCell}>
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
  );
};

export default GameBoard;
