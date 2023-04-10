import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import useQuestions from "../../hooks/useQuestions";
import Answers from "../Answers";
import MiniPlayer from "./../MiniPlayer";
import ProgressBar from "./../ProgressBar";
const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "question":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });

      return action.value;

    case "answer":
      const question = _.cloneDeep(state);
      question[action.questionID].options[action.optionIndex].checked =
        action.value;
      console.log(question);
      return question;

    default:
      return state;
  }
};

const Quiz = () => {
  const { id } = useParams();
  const { loading, error, question } = useQuestions(id);
  const [qun, dispatch] = useReducer(reducer, initialState);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "question", value: question });
  }, [question]);
  const hendleChinge = (e, index) => {
    dispatch({
      type: "answer",
      value: e.target.checked,
      optionIndex: index,
      questionID: currentQuestion,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < question.length) {
      setCurrentQuestion((curreQuestion) => curreQuestion + 1);
    }
  };
  const prevQuestion = () => {
    if (currentQuestion > 0 && currentQuestion < question.length) {
      setCurrentQuestion((curreQuestion) => curreQuestion - 1);
    }
  };

  const submit = async () => {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);
    await set(resultRef, {
      [id]: qun,
    });

    navigate(`/result/${id}`, {
      state: qun,
    });
  };

  const percentage =
    question.length > 0 ? ((currentQuestion + 1) / question.length) * 100 : 0;

  return (
    <>
      {loading && <span>loading...</span>}
      {error && <span>ther was an error!</span>}
      {!loading && !error && qun && qun.length > 0 && (
        <>
          <h1>{qun[currentQuestion].title} </h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            options={qun[currentQuestion].options}
            hendleChinge={hendleChinge}
            input={true}
          />
          <ProgressBar
            percentage={percentage}
            next={nextQuestion}
            prev={prevQuestion}
            submit={submit}
          />
          <MiniPlayer id={id} title={qun[currentQuestion].title} />
        </>
      )}
    </>
  );
};

export default Quiz;
