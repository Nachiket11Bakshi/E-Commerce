import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice';
import adminProductSlice from './admin/products-slice';
import shopProductsSlice from './shop/products-slice';



const store = configureStore({
    reducer:{
        auth:authReducer,
        adminProducts:adminProductSlice,
        shopProducts:shopProductsSlice,
    },
})

export default store;