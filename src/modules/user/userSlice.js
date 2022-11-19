import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
      isUserLoggedIn: '',
      
  },
    reducers: {
        statusUserLogin: (state, action) => {
            state.isUserLoggedIn = action.payload;
      }
  },

  extraReducers: (builder) => {
  
     
  },
});


export default userSlice;
