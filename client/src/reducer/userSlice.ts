import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../utilitis/baseUrl";


export const getUserById = createAsyncThunk('/getUser',async (id:string)=>{
  try{
    const result =await axios.get(`${base_URL}/users/${id}`)
    return result.data.result
 }
 catch(err){
     return err
 }
})

export type DataTypeOfUser = {
  
    _id: string
    "name": string
    "email": string,
    "image": string
    "posts": any[],
    "followers": [],
    "following": [],
    "role": string,
    "block": boolean,
    "createdAt": string,
    "updatedAt": string
};

export interface UserStateType {
  data: DataTypeOfUser | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: UserStateType = {
  data: null,
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess: (state, action: PayloadAction<DataTypeOfUser>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    loginFailure: (state) => {
      state.data = null;
      state.isLoading = false;
      state.isError = true;
    },
  },

  extraReducers:(build)=>{
    build.addCase(getUserById.fulfilled,(state,action)=>{
        state.data=action.payload
        state.isLoading=false,
        state.isError=false
    })
    build.addCase(getUserById.pending,(state)=>{
      state.isLoading=true,
      state.isError=false
  })
  build.addCase(getUserById.rejected,(state)=>{
    state.isLoading=false,
    state.isError=true
})
  }
});

export const { loginRequest, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
