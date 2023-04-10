import _ from "lodash";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";
const Result = () => {
  const { id } = useParams();
  const { loading, error, answers } = useAnswers(id);
  const loaction = useLocation();
  const { state } = loaction;
  const qun = state;
  console.log(qun);

  const celculet = () => {
    let score = 0;
    answers.forEach((question, index1) => {
      let correctIndexes = [],
        checkedIndexes = [];

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2);
        if (qun[index1].options[index2].checked) {
          checkedIndexes.push(index2);
          option.checked = true;
        }
      });
      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score = score + 5;
      }
    });
    return score;
  };
  const userScore = celculet();

  return (
    <>
      {loading && <div>loading...</div>}
      {error && <div>there was an error</div>}
      {answers && answers.length > 0 && (
        <>
          <Summary userScore={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
};

export default Result;
