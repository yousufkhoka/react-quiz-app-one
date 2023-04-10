import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";

const useVideosList = (page) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    const fetchVideos = async () => {
      const db = getDatabase();
      const videosRef = ref(db, "videos");
      const videosQuery = query(
        videosRef,
        orderByKey(),
        startAt("" + page),
        limitToFirst(8)
      );

      try {
        setLoading(true);
        setError(false);
        const snapshot = await get(videosQuery);
        setLoading(false);

        if (snapshot.exists()) {
          setVideos((prevVideos) => {
            return [...prevVideos, ...Object.values(snapshot.val())];
          });
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    };
    fetchVideos();
  }, [page]);

  return {
    loading,
    error,
    videos,
    hasMore,
  };
};

export default useVideosList;
