import React from "react";
import signupimage from "../assets/images/signup.svg";
import classes from "./styles/Illustration.module.css";
const Illustration = () => {
  return (
    <div class={classes.illustration}>
      <img src={signupimage} alt="Signup" />
    </div>
  );
};

export default Illustration;
