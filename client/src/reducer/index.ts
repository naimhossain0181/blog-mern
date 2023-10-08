import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import postSlice, { PostStateType } from "./postSlice";
import userSlice, { UserStateType } from "./userSlice";

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  })

const store=configureStore({
    reducer:{
        Posts:postSlice,
        User:userSlice
    },
    middleware:customizedMiddleware
})



export type RootState= {
    Posts:PostStateType
    User?:UserStateType
}
export type AppDispatch=typeof store.dispatch
export default store