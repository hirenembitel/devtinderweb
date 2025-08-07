import React from 'react'
import axios from 'axios';

const handleLogout = async () => {
const result = await axios.post('http://localhost:3000/logout', {}, {
    withCredentials: true, // Include cookies in the request
})
    .then(response => {
    console.log('Logout successful:', response.data);
    alert('Logout successful!');
    // Handle successful logout (e.g., redirect to login)
    }).catch(error => {
        console.error('Logout failed:', error);
        alert('Logout failed. Please try again.');
    });
    // Handle logout logic here
    console.log('Logging out');
    // You can add your logout logic here
}

const Logout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Logout</h2>
          <p className="text-center mb-4">Are you sure you want to logout?</p>
          <div className="form-control mt-6">
            <button onClick={handleLogout} className="btn btn-primary">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout