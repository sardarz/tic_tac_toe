import React from "react";

const GameStats = ({firstPlayerMark, score, isVersusCPU}) => {
  return (
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
  );
};

export default GameStats;
