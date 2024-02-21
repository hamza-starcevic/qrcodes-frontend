import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";


const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        // ... other reducers
    }
});

export default store;