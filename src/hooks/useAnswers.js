import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useAnswers = (videoID) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const db = getDatabase();
      const answersRef = ref(db, "answers/" + videoID + "/questions");
      const answersQuery = query(answersRef, orderByKey());

      try {
        setLoading(true);
        setError(false);
        const snapshot = await get(answersQuery);
        setLoading(false);

        if (snapshot.exists()) {
          setAnswers((prevVideos) => {
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
    answers,
  };
};

export default useAnswers;
