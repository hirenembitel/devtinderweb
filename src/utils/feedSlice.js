import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from './constants.js';
//import { removeRequestById } from './requestSlice.jsx';

export const fetchFeeds = createAsyncThunk (
    'feeds/fetchFeeds',
    async({page, limit}, thunkAPI) => {
        const response = await axios.get(API_BASE_URL+'/user/feed?page='+page+'&limit='+limit, {
            withCredentials : true
        });
        return {
            feeds:response.data.cardList,
            page,
            totalPages:response.data.pagination?.totalPages || 1
        };
    }
);

const feedSlice = createSlice({
    name:"feeds",
    initialState:{
        feedsByPage:{},
        page:1,
        limit:2,
        totalPages:0,
        isLoading:false
    },
    reducers:{
        setPage(state, action) {
            state.page = action.payload;
            //console.log("called state page change");
        },
        removeFeedRequestById(state,action) {
            const { page, id } = action.payload;
            if (state.feedsByPage[page]) {
                state.feedsByPage[page] = state.feedsByPage[page].filter(feed => feed._id !== id);
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchFeeds.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchFeeds.fulfilled, (state, action) => {
            state.feedsByPage[action.payload.page] = action.payload.feeds || [];
            state.totalPages = action.payload.totalPages || 1;
            state.isLoading = false;
        })
        .addCase(fetchFeeds.rejected, (state) => {
            state.isLoading = false;
        })
    }
});

export const { setPage, removeFeedRequestById } = feedSlice.actions;
export default feedSlice.reducer;