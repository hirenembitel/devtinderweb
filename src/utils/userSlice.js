import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
    initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: true,
    error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false;
        }
        ,
        clearUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.isLoading = false;
        }
        ,
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
        ,
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;