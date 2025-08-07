import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom'; // <-- Import here
import { API_BASE_URL } from '../utils/constants.js';

const Login = () => {
  const user = useSelector((state) => state.user.user); // Use useSelector to access user state
  const navigate = useNavigate(); // Initialize useNavigate here  
  const [email, setEmail] = React.useState('hiren.kava@gmail.com');
  const [password, setPassword] = React.useState('Hiren@123');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();
  //const navigate = useNavigate(); // <-- Initialize here

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    await axios.post(API_BASE_URL+'/login', userData, {
      withCredentials: true,
    })
      .then(response => {
        dispatch(setUser(response.data.user));
        navigate('/'); // <-- Navigate after login
      })
      .catch(error => {
        setError(error.response ? error.response.data.message : 'Login failed');
        //alert('Login failed. Please check your credentials.' + error.response.data.message);
      });
  }

 return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form>
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className='text-red-500'>{error}</p>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button onClick={handleLogin} className="btn btn-primary">Login</button>
            </div>
          </form>

          {/* Signup Link */}
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <a href="#" className="link link-primary">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login