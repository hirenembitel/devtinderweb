import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
	name:"feeds",
	initialState : {
		feeds:"",       
		error:null,
        isLoading: true,
        pagination : {
            currentPage:1,
            limit:2,
            totalPages:1
        }
	},
	reducers:{
		setFeeds:(state, action) => {
			state.feeds = action.payload;
            //alert( JSON.stringify(state.feeds));
		},
		clearFeeds:(state) => {
			state.feeds = null;
		},
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
	}
});

export const { setFeeds } = feedSlice.actions;
export default feedSlice.reducer;