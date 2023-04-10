import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useVideosList from "../hooks/useVideosList";
import classes from "./styles/Videos.module.css";
import Video from "./Video";

const Videos = () => {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideosList(page);

  return (
    <>
      {videos.length > 0 && (
        <InfiniteScroll
          loader="loading..."
          dataLength={videos.length}
          next={() => setPage(8 + page)}
          hasMore={hasMore}
        >
          <div className={classes.videos}>
            {videos.map((video) =>
              video.noq > 0 ? (
                <Link to={`/Quiz/${video.youtubeID}`} key={video.youtubeID}>
                  <Video
                    title={video.title}
                    id={video.youtubeID}
                    noq={video.noq}
                  />
                </Link>
              ) : (
                <Video
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                  key={video.youtubeID}
                />
              )
            )}
          </div>
        </InfiniteScroll>
      )}
      {loading && <span>loading...</span>}
      {!loading && videos.length === 0 && <span>no data found</span>}
      {error && <span>there was an error</span>}
    </>
  );
};

export default Videos;
