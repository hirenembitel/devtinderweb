import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, clearMessage } from "../utils/EditProfileSlice.js";

const EditProfile = () => {
  const dispatch = useDispatch();
// ✅ Prefill के लिए login user
  const loggedInUser = useSelector((state) => state.user.user);
  // ✅ state.profile read कर रहे हैं क्योंकि store में key 'profile' है
  const { user, isLoading, message, error } = useSelector(
    (state) => state.profile
  );

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    skills: ""
  });

  // ✅ Prefill data when user changes
  useEffect(() => {
    if (loggedInUser) {
      setFormData({
        firstname: loggedInUser.firstname || "",
        lastname: loggedInUser.lastname || "",
        age: loggedInUser.age || "",
        gender: loggedInUser.gender || "",
        skills: loggedInUser.skills || ""
      });
    }
  }, [loggedInUser]);

  // ✅ Auto-clear messages after 3 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProfile(formData));
  };

  return (
    <div style={styles.container}>
      <h2>Edit Profile</h2>

      {/* ✅ Success & Error Messages */}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />

        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />

        <label>Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">-- Select --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Skills:</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
};

export default EditProfile;
