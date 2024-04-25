import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  all_url,
  category_url,
  eachcategory_url,
  singleItem_url,
} from "../../Api/apiUrl";

let cat_url = category_url;
let eachcat_url = eachcategory_url;
let single_url = singleItem_url;
let allProd_url = all_url;

//Get all products
export const getAll = createAsyncThunk("get/getAll", async () => {
  const res = await axios.get(allProd_url);
  // console.log("Slice get: ", res);
  return res?.data;
});

//Get category
export const getCategory = createAsyncThunk("get/getCategory", async () => {
  const res = await axios.get(cat_url);
  // console.log("Slice get: ", res);
  return res?.data;
});

//Get each category
export const geteachCat = createAsyncThunk("get/geteachCat", async (item) => {
  // console.log("each category", `${eachcat_url}/${item}`);
  const res = await axios.get(`${eachcat_url}/${item}`);
  // console.log("Slice get: ", res.data.products);
  return res?.data;
});

//Get single item
export const singleItem = createAsyncThunk("get/singleItem", async (id) => {
  const res = await axios.get(`${single_url}/${id}`);
  // console.log("Slice get: ", res.data);
  return res?.data;
});

//search data
export const searchItem = createAsyncThunk("get/searchItem", async (search) => {
  // console.log("Search: ", search);
  const res = await axios.get(`https://dummyjson.com/products/search?q=${search}`);
  // console.log("Slice get: ", res.data);
  return res?.data;
});

const initialValues = {
  userData: [],
  loading: false,
  error: null,
};

export const mediaSlice = createSlice({
  name: "Slice",
  initialState: initialValues,

  extraReducers: (builder) => {
    //Get All
    builder.addCase(getAll.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
      // console.log("Fulfilled action: ", action);
    });
    builder.addCase(getAll.rejected, (state, action) => {
      state.loading = false;
      state.userData = [];
      state.error = action.error.message;
      console.log("Rejected action: ", action);
    });
    //Get All ends

    //Get category
    builder.addCase(getCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
      // console.log("Fulfilled action: ", action);
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.loading = false;
      state.userData = [];
      state.error = action.error.message;
      console.log("Rejected action: ", action);
    });
    //Get category ends

    //Get each category
    builder.addCase(geteachCat.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(geteachCat.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
      // console.log("Fulfilled action: ", action.payload.products);
    });
    builder.addCase(geteachCat.rejected, (state, action) => {
      state.loading = false;
      state.userData = [];
      state.error = action.error.message;
      // console.log("Rejected action: ", action);
    });
    //Get each category ends

    //Get each item
    builder.addCase(singleItem.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(singleItem.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
      // console.log("Fulfilled action: ", action.payload);
    });
    builder.addCase(singleItem.rejected, (state, action) => {
      state.loading = false;
      state.userData = [];
      state.error = action.error.message;
      console.log("Rejected action: ", action);
    });
    //Get each item ends

    //Search
    builder.addCase(searchItem.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(searchItem.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
      // console.log("Fulfilled action: ", action.payload);
    });
    builder.addCase(searchItem.rejected, (state, action) => {
      state.loading = false;
      state.userData = [];
      state.error = action.error.message;
      console.log("Rejected action: ", action);
    });
    //Search ends
  },
});
export default mediaSlice.reducer;
