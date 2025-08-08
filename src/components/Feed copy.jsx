import React, { use, useEffect, useState } from 'react'
import { API_BASE_URL } from '../utils/constants.js';
import axios from 'axios';
import { current } from '@reduxjs/toolkit';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
 
    const fetchPosts = async (currentPage, limit) => {  
    // Fetch feed data from fee API   
        const feedData = await axios.get(API_BASE_URL + '/user/feed?page=' + currentPage + '&limit=' + limit,
          {withCredentials: true}
        ).then(response => {
          if (response.data) {
            setPosts(response.data.cardList);
            setTotalPages(response.data.pagination.totalPages);
            setPage(response.data.pagination.currentPage);
            setLimit(response.data.pagination.limit);
          }
        }).catch(error => {
          console.error("Error fetching feed data:", error);
          setPosts([]);
        });
        setLoading(false);
    }
    useEffect(() => { 
    fetchPosts(page, limit);
  }, [page, limit]);
  
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));
  return (
    <div className="feed">
      <h2 className="text-2xl font-bold mb-4">Feed</h2>
    <div className="feed-container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="posts">
          {posts.map((post) => (
            <div key={post._id} className="post">
              <h3>Name : {post.firstname} {post.lastname}</h3>
              <p>Age : {post.age}</p>
              <p>Gender : {post.gender}</p>
            </div>
          ))}
        </div>
      )}
     <div style={{ marginTop: '20px' }}>
        <button onClick={handlePrev} disabled={page === 1}>Previous</button>
        <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages}>Next</button>
      </div>
      {posts.length === 0 && !loading && (
        <div>No posts available.</div>
      )}

    </div>
    </div>
  );
};

export default Feed