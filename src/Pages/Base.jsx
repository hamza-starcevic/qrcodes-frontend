import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Login } from "./Login.jsx";
import Home from "./Home.jsx";
import { selectUser } from "../redux/reducers/userSlice.js";
import { useEffect, useState } from "react";
import PredmetForm from "../Components/PredmetForm.jsx";
import PregledPredmeta from "./PregledPredmeta.jsx";
import { finishLoading, startLoading } from "../redux/reducers/loadingSlice.js";

export function Base() {
    const dispatch = useDispatch();
    const ProtectedRoute = () => {
        const user = useSelector(selectUser);

        useEffect(() => {
            dispatch(startLoading());
            // Handle potential asynchronous updates to the user state
            if (user) { // Check if user state has loaded
                dispatch(finishLoading());
            }
        }, [user]);

        return user.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/login"} element={<Login />} />
                <Route element={<ProtectedRoute />} >
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/predmeti"} element={<PregledPredmeta />} />
                    <Route path={"/profile"} element={<h1>Profile</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
