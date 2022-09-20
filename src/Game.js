import React from "react";
import logo from "./assets/logo.svg";
import restartIcon from "./assets/icon-restart.svg";
import { ReactComponent as ICON_X_SMALL } from "./assets/icon-x-small.svg";
import { ReactComponent as ICON_X } from "./assets/icon-x.svg";
import { ReactComponent as ICON_O } from "./assets/icon-o.svg";

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

          <div className="game-board">
            <div className="game-cell">
              <ICON_X />
            </div>
            <div className="game-cell">
              <ICON_O />
            </div>
            <div className="game-cell"></div>
            <div className="game-cell"></div>
            <div className="game-cell"></div>
            <div className="game-cell"></div>
            <div className="game-cell"></div>
            <div className="game-cell"></div>
            <div className="game-cell"></div>
          </div>

          <div className="game-stats">
            <div className="game-stats-x">
              <p>
                x <span>(you)</span>
              </p>
              <div className="game-stat-output">14</div>
            </div>
            <div className="game-stats-tie">
              <p>
                ties 
              </p>
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
