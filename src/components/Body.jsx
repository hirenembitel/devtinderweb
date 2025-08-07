import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { API_BASE_URL } from "../utils/constants.js";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice.js";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useSelector } from "react-redux"; // Import useSelector to access user state

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user); // Use useSelector to access user state  
  const fetchProfile = async () => {
    // Fetch profile data if needed
     await axios.get(API_BASE_URL + '/profile/view',
       { withCredentials: true }
      ).then(response => {       
        if (response.data) {       
          dispatch(setUser(response.data));
        }
      }
      ).catch(error => {        
        if(error.response && error.response.status === 401) {
          // Handle unauthorized access, e.g., redirect to login
          navigate("/login");
        }
      });    
  }
  useEffect(() => {
    if(!user) {
      fetchProfile();
    }
    
  }, []);
  return (
    <div>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body