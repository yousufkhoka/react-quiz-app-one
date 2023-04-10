import React, { useRef, useState } from "react";
import Button from "./Button";
import classes from "./styles/ProgaressBar.module.css";

const ProgressBar = ({ next, prev, percentage, submit }) => {
  const tooltipRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const toggleTooltip = () => {
    if (toggle) {
      setToggle(false);
      tooltipRef.current.style.display = "none";
    } else {
      setToggle(true);
      tooltipRef.current.style.left = `calc(${percentage}% - 63px)`;
      tooltipRef.current.style.display = "block";
    }
  };
  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={prev}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipRef}>
          {percentage}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${percentage}%` }}
            onMouseOver={toggleTooltip}
            onMouseOut={toggleTooltip}
          ></div>
        </div>
      </div>

      <Button
        className="button next"
        onClick={percentage === 100 ? submit : next}
      >
        <span>{percentage === 100 ? "Submit" : " Next Question"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
};

export default ProgressBar;
