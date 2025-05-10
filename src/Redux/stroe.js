import { configureStore } from "@reduxjs/toolkit";
import { investmentAPI } from "../Api/investmentApi";
import { investmentGraphAPI } from "../Api/InvestmentGraphAPI";

export const store = configureStore({
    reducer : {
        [investmentAPI.reducerPath] : investmentAPI.reducer,
        [investmentGraphAPI.reducerPath] : investmentGraphAPI.reducer
    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(investmentAPI.middleware)
    .concat(investmentGraphAPI.middleware)
    
})