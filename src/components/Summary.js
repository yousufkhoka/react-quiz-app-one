import React from "react";
import image from "./../assets/images/success.png";
import classes from "./styles/Summary.module.css";
const Summary = ({ userScore, noq }) => {
  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        <p className={classes.score}>
          Your score is <br />
          {userScore} out of {noq * 5}
        </p>
      </div>

      <div className={classes.badge}>
        <img src={image} alt="Success" />
      </div>
    </div>
  );
};

export default Summary;
