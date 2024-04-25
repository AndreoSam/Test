import { configureStore } from "@reduxjs/toolkit";
import reducer from "../Reducer/mediaSlice";

const store = configureStore({
    reducer: {
        pro: reducer,
    }
})

export default store;