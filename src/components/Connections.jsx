import React, {useEffect} from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections, clearConnections } from '../utils/ConnectionSlice.jsx';
import { useNavigate } from 'react-router-dom';

const Connections = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const connections = useSelector((state) => state.connections);
    const fetchConnections = async () => {
        try {
            const response = await axios.get(API_BASE_URL+'/user/connections', 
            {withCredentials:true}
            );
            console.log(response.data.connections);    
            dispatch(addConnections(response.data.connections));
        }catch(error)  {
                console.error("Error fetching connections:", error);
        }
    }
    const goToChat = (targetUserId) => {
      navigate("/chat/"+targetUserId); // Redirect to /profile route
    };
    useEffect(() => {
        fetchConnections();
    },[]);
  return (
    <div>
      <h2>Connections</h2>
      {connections.length > 0 ? (
        <ul>
          {connections.map((connection) => (
            <li key={connection._id}>
              {connection.user.firstname} {connection.user.lastname}
              <div className="card-actions justify-end">
                  <button onClick={() => goToChat(connection.user._id)}  className="btn btn-primary">Chat</button>      
             </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No connections found.</p>
      )}
    </div>
  );
};

export default Connections