import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl="http://localhost:9000"

export const getAllPost= createAsyncThunk("/allpost", async ()=>{
        try{
           const result =await axios.get(baseUrl+"/posts")
           return result.data.result
        }
        catch(err){
            return err
        }
})

export const getSinglePost=createAsyncThunk("/posts/:id", async(id:string)=>{
    try{
        const result =await axios.get(`${baseUrl}/posts/${id}`)
        console.log(result)
        return result.data.result
     }
     catch(err){
         return err
     }
})



export type Data={
    "_id": string,
    "title": string,
    "desc": string,
    "image": string,
    "author": {
        "_id":string,
        "name":string,
        "image":string
    },
    "views": number,
    "likes": any[],
    "comments": any[],
    "category": {
        "_id":string
        "name":string,
        "icon":string
    },
    "createdAt":string,

}

export interface sateTypes{
    data:Data[],
    isLoading:boolean,
    isError:boolean
}

const initialState:sateTypes={
    data:[],
    isLoading:false,
    isError:false
}

const postSlice= createSlice({
    name:"Post",
    initialState:initialState,
    reducers:{
        add:(state,action)=>{
            state.data=action.payload
        }
    },

    extraReducers:(build)=>{
        // get All Post
        build.addCase(getAllPost.fulfilled,(state,action)=>{
            state.data=action.payload
            state.isLoading=false

        })
        build.addCase(getAllPost.pending,(state)=>{
            state.isLoading=true
            state.isError=false

        })
        build.addCase(getAllPost.rejected,(state)=>{
            state.isLoading=false
            state.isError=true

        })

        // get single post

        build.addCase(getSinglePost.fulfilled,(state,action)=>{
            state.data=action.payload
            state.isLoading=false

        })
        build.addCase(getSinglePost.pending,(state)=>{
            state.isLoading=true
            state.isError=false

        })
        build.addCase(getSinglePost.rejected,(state)=>{
            state.isLoading=false
            state.isError=true

        })
    }
})

export const {add}= postSlice.actions
export default postSlice.reducer