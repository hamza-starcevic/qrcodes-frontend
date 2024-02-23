import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import sessionStorage from "redux-persist/es/storage/session";
import config from "../config";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import loadingSlice from "./reducers/loadingSlice";


const persistConfig = {
    key: 'root',
    storage: sessionStorage,
}

const rootReducer = combineReducers({
    user: userSlice,
    loading: loadingSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: config.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);