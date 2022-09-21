import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "./assets/logo.svg";
import { ReactComponent as IconX } from "./assets/icon-x.svg";
import { ReactComponent as IconO } from "./assets/icon-o.svg";
import { useNavigate } from "react-router-dom";
import PlayerContext from "./PlayerContext";

const Menu = () => {
  const { setFirstPlayerMark } = useContext(PlayerContext);
  const chosenRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setFirstPlayerMark("X")
  }, [])

  const moveChosenMark = (evt) => {
    chosenRef.current.classList.add("chosenMove");
    setFirstPlayerMark('O')
  };

  const removeChosenMark = (evt) => {
    chosenRef.current.classList.remove("chosenMove");
    setFirstPlayerMark('X')
  };
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
          <button className="btn btn-cpu" onClick={() => {
            navigate("/game?isVersusCPU=true")
          }}>new game (vs cpu)</button>
          <button
            onClick={() => {
              navigate("/game");
            }}
            className="btn btn-player"
          >
            new game (vs player)
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
