import React, { useState } from 'react';
import axios from "axios";
import { API_BASE_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { removeFeedRequestById } from "../utils/feedSlice.js";

const UserCard = ({user}) => {
  const dispatch = useDispatch();
  let currentPage = useSelector((state) => state.feeds.page);
  currentPage = (currentPage) ? currentPage : 1;
  //console.log("currentPage::"+currentPage);
  const [isFading, setIsFading] = useState(false);
  const handSendRequest = async (status,feedId) => {
      try{
          const response = await axios.post(API_BASE_URL+"/request/send/"+status+'/'+feedId,{},{withCredentials:true});
          console.log(response.data);
          if(response.data.valid) {        
            setIsFading(true); 
            dispatch(removeFeedRequestById({ page: currentPage, id: feedId }));            
          }          
      }catch(error) {
        console.log(error.message);
      }    
    };
const fadeOutStyle = {
  opacity: 0,
  transform: "scale(0.95)",
  transition: "opacity 0.3s ease, transform 0.3s ease"
};
  return (
    <div style={isFading ? fadeOutStyle : {}} className="card card-side bg-base-100 shadow-sm">
  <figure>
    <img style={{ width: '200px', height: '150px' }} 
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      alt="Movie" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user.firstname} {user.lastname}</h2>
    <p>{user.age}</p>
    <p>{user.gender}</p>
    <div className="card-actions justify-end">
      <button onClick={() => handSendRequest("ignored",user._id)}  className="btn btn-primary">Ignore</button>
      <button onClick={() => handSendRequest("interested",user._id)} className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard