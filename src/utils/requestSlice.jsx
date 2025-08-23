import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "./constants.js";

export const updateRequestStatus = createAsyncThunk(
  "connections/updateRequestStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_BASE_URL+'/request/review/'+status+'/'+id,
        {},
        { withCredentials:true }
      );
      //console.log(res.data);
      return { id, status: status };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const requestSlice = createSlice({
    name:"requests",
    initialState:null,
    reducers : {
        addRequest:(state,action) =>{
            return action.payload;
        },
        clearRequest:() => {
            return '';
        },
        markRequestTempStatus: (state, action) => {
        const req = state.find((r) => r.from_user_id._id === action.payload.id);
        if (req) {
            req.tempStatus = action.payload.status;
        }
        },
        removeRequestById: (state, action) => {
        return state.filter((req) => req.from_user_id._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
    builder.addCase(updateRequestStatus.fulfilled, (state, action) => {  
        //alert(action.payload.id);     
      const req = state.filter((req) => req.from_user_id._id !== action.payload.id);
      if (req) {
        req.tempStatus = action.payload.status; // triggers fade
      }
    });
  },
});

export const { addRequest, clearRequest, markRequestTempStatus, removeRequestById } = requestSlice.actions;
export default requestSlice.reducer;