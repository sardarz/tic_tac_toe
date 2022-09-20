import React from "react";
import logo from "./assets/logo.svg";
import restartIcon from "./assets/icon-restart.svg";
import { ReactComponent as ICON_X_SMALL } from "./assets/icon-x-small.svg";

const Game = () => {
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
            <div className="game-restart">
              <img src={restartIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Game;
