import React from "react";
import logo from "./assets/logo.svg";
import restartIcon from "./assets/icon-restart.svg";
import { ReactComponent as ICON_X_SMALL } from "./assets/icon-x-small.svg";
import { ReactComponent as ICON_O_SMALL } from "./assets/icon-o-small.svg";

const GameHeader = ({setShowRestart, currentPlayer}) => {
  return (
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
  );
};

export default GameHeader;
