import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading:false,
    productList:[]
}

export const fetchAllFilteredProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async () => {

           try{
            const result = await axios.get(
              "http://localhost:5000/api/shop/products/get"
            ).then(response=>{console.log(response.data)})
            .catch(error => {console.log(error)});
      
            
        
            return result?.data;
           }catch(e){
                console.log(e);
           }
     
    }
  );

  const shoppingProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState, // Assuming you have defined `initialState` elsewhere
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllFilteredProducts.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
           // Assuming payload contains data
          state.isLoading = false;
          state.productList = action?.payload?.data; // Access data property
        })
        .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.productList = []; // Set to an empty array on rejection
        });
    },
  });
  

export default shoppingProductSlice.reducer;