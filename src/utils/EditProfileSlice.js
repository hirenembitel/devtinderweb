import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "./constants.js";

export const editProfile = createAsyncThunk(
  "profile/editProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        API_BASE_URL + "/profile/edit",
        userData,
        { withCredentials: true }
      );
      // ✅ सिर्फ user object return कर रहे हैं
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating user");
    }
  }
);

const editProfileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    isLoading: false,
    message: "",
    error: null
  },
  reducers: {
    clearMessage: (state) => {
      state.message = "";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(editProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // ✅ direct object
        state.message = "Profile updated successfully.";
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Update failed";
      });
  }
});

export const { clearMessage } = editProfileSlice.actions;
export default editProfileSlice.reducer;
