import React, {useEffect} from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, updateRequestStatus, removeRequestById  } from '../utils/requestSlice.jsx';

const Request = () => {
 // alert('called');
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.requests); 
    const handleAction = (id, status) => {
       dispatch(updateRequestStatus({ id, status }))
      .unwrap()
      .then(() => {
        setTimeout(() => {
           dispatch(removeRequestById(id));
        }, 1000); // remove after fade
      });
    };
    const fetchRequest = async () => {
        try {
            const response = await axios.get(API_BASE_URL+'/user/requests/recieved', 
            {withCredentials:true}
            );
           // console.log(response.data.requests);    
            dispatch(addRequest(response.data.requests));
        }catch(error)  {
                console.error("Error fetching connections:", error);
        }
    }
    useEffect(() => {
        fetchRequest();
    },[]);
  return (
    <div>
      <h2>Requests</h2>
      {requests ? (
        <ul>
          {requests.map((request) => (
            <li key={request._id} style={{
    opacity: request.tempStatus ? 0 : 1,
    transition: "opacity 0.5s ease-out"
  }}>
              {request.from_user_id.firstname} {request.from_user_id.lastname}
              {!request.tempStatus && (
            <>
              <br />
              <button onClick={() => handleAction(request.from_user_id._id, "rejected")} className="btn btn-primary mx-2">Reject</button>
              <button onClick={() => handleAction(request.from_user_id._id, "accepted")} className="btn btn-secondary mx-2">Accept</button>
              </>
          )}
          {request.tempStatus && (
            <span style={{
      marginLeft: "10px",
      fontStyle: "italic",
      color: "gray"
    }} className="status-text">{request.tempStatus}</span>
          )}
            </li>
          ))}
          
        </ul>
      ) : (
        <p>No connections found.</p>
      )}
    </div>
  );
};

export default Request