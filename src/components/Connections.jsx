import React, {useEffect} from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections, clearConnections } from '../utils/ConnectionSlice.jsx';

const Connections = () => {
    const dispatch = useDispatch();
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