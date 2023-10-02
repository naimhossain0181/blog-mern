import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import postSlice from "./postSlice";

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  })

const store=configureStore({
    reducer:{
        Posts:postSlice
    },
    middleware:customizedMiddleware
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch
export default store