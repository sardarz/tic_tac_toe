import React from "react";
import logo from "./assets/logo.svg"
import restartIcon from "./assets/icon-restart.svg"

const Game = () => {
  return (
    <main className="game">
      <div className="container">
        <div className="game-content">
          <div className="game-header">
            <div className="game-logo">
              <img src={logo} alt="" />
            </div>
            <p className="game-turn"><span className="game-current-turn">X</span>turn</p>
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
