import { configureStore } from "@reduxjs/toolkit";
import { investmentAPI } from "../Api/investmentApi";

export const store = configureStore({
    reducer : {
        [investmentAPI.reducerPath] : investmentAPI.reducer,
    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(investmentAPI.middleware)
    
})