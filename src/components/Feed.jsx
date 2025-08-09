import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeeds, setPage} from "../utils/feedSlice.js";
import UserCard from "./UserCard.jsx";

const Feed = () => {
  const dispatch = useDispatch();
  const { feedsByPage, page, limit, totalPages, isLoading} = useSelector((state) => state.feeds);
  const feeds = Array.isArray(feedsByPage[page]) ? feedsByPage[page] : [];
 console.log(" called ");
  useEffect(()=> {
      if(!feedsByPage[page]) {
        dispatch(fetchFeeds({page, limit}));
      }
  },
  [dispatch, page, limit, feedsByPage]);


const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
}

return (
  <div>
    {isLoading && <p>Loading...</p>}
    {feeds.map((item) => (
      <UserCard user={item} />
    ))}
    <div>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          style={{ backgroundColor: page === i + 1 ? 'lightblue' : 'white' }}
        >
          {i + 1}&nbsp;&nbsp;&nbsp;&nbsp;
        </button>
      ))}
    </div>
  </div>
);
};

export default Feed;