import React from "react";
import { ReactComponent as ICON_X } from "./assets/icon-x.svg";
import { ReactComponent as ICON_O } from "./assets/icon-o.svg";
import { useNavigate } from "react-router-dom"

const WinnerModal = ({ winner, updateWinnerScore }) => {
  const navigate = useNavigate()
  return (
    <div className="modal-winner-wrapper">
      <div className="modal-winner">
        <p className="modal-winner-text">
          {winner === "X" ? "you won!" : winner === "O" ? "you lost!" : ""}
        </p>
        <h2 className={`modal-winner-mark ${winner}`}>
          {winner === "X" ? <ICON_X /> : winner === "O" ? <ICON_O /> : ""}
          {winner !== "ties" ? "takes the round" : "round tied"}
        </h2>
        <div className="modal-winner-btns">
          <button onClick={() => navigate("/")} className="modal-winner-btn modal-winner-btn-quit">
            quit
          </button>
          <button
            className="modal-winner-btn modal-winner-btn-next"
            onClick={() => updateWinnerScore(winner)}
          >
            next round
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
