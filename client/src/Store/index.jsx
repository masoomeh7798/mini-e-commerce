import authSliceReducer from "./Slices/AuthSlice.js";
import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./Slices/CartSlice.js";
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        cart:CartSlice
    }
})
export default store