import React from "react";

const RestartModal = ({restartGame, closeModal}) => {
  return (
    <div className="modal-winner-wrapper restart">
      <div className="modal-winner">
        <h2 className={`modal-winner-mark`}>restart game?</h2>
        <div className="modal-winner-btns">
          <button onClick={closeModal} className="modal-winner-btn modal-winner-btn-quit">no, cancel</button>
          <button onClick={() => {
            restartGame()
            closeModal()
          }} className="modal-winner-btn modal-winner-btn-next">yes, restart</button>
        </div>
      </div>
    </div>
  );
};

export default RestartModal;
