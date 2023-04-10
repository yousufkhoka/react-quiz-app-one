import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useQuestions = (videoID) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const db = getDatabase();
      const quizFef = ref(db, "quiz/" + videoID + "/questions");
      const quizQuery = query(quizFef, orderByKey());

      try {
        setLoading(true);
        setError(false);
        const snapshot = await get(quizQuery);
        setLoading(false);

        if (snapshot.exists()) {
          setQuestion((prevVideos) => {
            return [...prevVideos, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    };
    fetchVideos();
  }, [videoID]);

  return {
    loading,
    error,
    question,
  };
};

export default useQuestions;
