//import {userSlice, setUser, clearUser, setLoading, setError } from './utils/userSlice.js';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants.js';
import { useDispatch } from 'react-redux';
import { clearUser } from '../utils/userSlice.js';

const NavBar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async(e) => {
    try {
      e.preventDefault();
      await axios.post(API_BASE_URL + '/logout', {}, { withCredentials: true });
      dispatch(clearUser());
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        <div className="flex gap-2">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />

          <div className="dropdown dropdown-end">
            {user && (
              <>
                <label>Welcome, {user.firstname}&nbsp;&nbsp;</label>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
              </>
            )}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {!user && (<li><Link to="/login">Login</Link></li>)}
              {user && (
                <>
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li><a>Settings</a></li>
                  <li><a onClick={handleLogout}>Logout</a></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
  )
}

export default NavBar