import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import classes from "./styles/MiniPlayer.module.css";

const MiniPlayer = ({ id, title }) => {
  const buttonRef = useRef();
  const [status, setStatus] = useState(false);

  const toggleMiniPlayer = () => {
    if (!status) {
      buttonRef.current.classList.remove(classes.floatingBtn);
      buttonRef.current.classList.remove(classes.player);
      setStatus(true);
    } else {
      buttonRef.current.classList.add(classes.floatingBtn);
      buttonRef.current.classList.add(classes.player);
      setStatus(false);
    }
  };
  const playerUrl = `https://www.youtube.com/watch?v=${id}`;
  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={buttonRef}
      onClick={toggleMiniPlayer}
    >
      <span className={`material-icons-outlined ${classes.open}`}>
        {" "}
        play_circle_filled{" "}
      </span>

      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={toggleMiniPlayer}
      >
        {" "}
        close{" "}
      </span>
      {status && (
        <ReactPlayer
          className={classes.player}
          url={playerUrl}
          width="300px"
          height="168px"
          playing
          controls
        />
      )}

      <p>{title}</p>
    </div>
  );
};

export default MiniPlayer;
