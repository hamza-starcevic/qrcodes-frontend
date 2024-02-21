import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: '',
    email: '',
    isLoggedIn: false,
    token: null,
    preferences: {
        // ... user preferences
    }
};

const userSlice = createSlice(
    {
        name: "user",
        initialState,
        reducers: {
            login: (state, action) => {
                // Update state for user login (e.g., Set isLoggedIn, user details)
                state.isLoggedIn = true;
                state.id = action.payload.id;
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.token = action.payload.token;
            },
            logout: (state) => {
                // Update state for user logout (e.g., Reset to initial values)
                state.token = null;
                state.isLoggedIn = false;
            },
            updatePreferences: (state, action) => {
                state.preferences = { ...state.preferences, ...action.payload };
            },
        }
    }
);


export const {login, logout, updatePreferences} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice;