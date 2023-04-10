import React from "react";
import Checkbox from "./Checkbox";
import classes from "./styles/Answers.module.css";

const Answers = ({ options = [], hendleChinge, input }) => {
  return (
    <>
      <div className={classes.answers}>
        {options.map((option, index) => (
          <>
            {input ? (
              <Checkbox
                key={index}
                value={index}
                checked={option.checked}
                className={classes.answer}
                text={option.title}
                onClick={(e) => hendleChinge(e, index)}
              />
            ) : (
              <Checkbox
                key={index}
                className={`${classes.answer} ${
                  option.correct
                    ? classes.correct
                    : option.checked
                    ? classes.wrong
                    : null
                } `}
                text={option.title}
                defaultChecked={option.checked}
                disabled
              />
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default Answers;
