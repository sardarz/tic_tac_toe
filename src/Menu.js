import React, { useRef, useState } from "react";
import logo from "./assets/logo.svg";
import { ReactComponent as IconX } from "./assets/icon-x.svg";
import { ReactComponent as IconO } from "./assets/icon-o.svg";

const Menu = () => {
  const [currentPlayer, setCurrentPlayer] = useState("X")
  const chosenRef = useRef(null);

  const moveChosenMark = evt => {
    chosenRef.current.classList.add('chosenMove')
    setCurrentPlayer('O')
  }

  const removeChosenMark = evt => {
    chosenRef.current.classList.remove('chosenMove')
    setCurrentPlayer('X')
  }
  return (
    <section className="menu">
      <div className="container">
        <div className="menu-content">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="player-pick">
            <h2>pick player 1's mark</h2>
            <div className="mark-wrapper" ref={chosenRef}>
              <div className="icon-wrapper chosen" onClick={removeChosenMark}>
                <IconX />
              </div>
              <div className="icon-wrapper" onClick={moveChosenMark}>
                <IconO />
              </div>
            </div>
            <p>remember: x goes first</p>
          </div>
          <button className="btn btn-cpu">new game (vs cpu)</button>
          <button className="btn btn-player">new game (vs player)</button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
