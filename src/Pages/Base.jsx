import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { Login } from "./Login.jsx";
import Home from "./Home.jsx";
import { selectUser } from "../redux/reducers/userSlice.js";
import { useEffect, useState } from "react";

export function Base() {
    const ProtectedRoute = () => {
        const user = useSelector(selectUser);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            // Handle potential asynchronous updates to the user state
            if (user) { // Check if user state has loaded
                setIsLoading(false);
            }
        }, [user]);

        // Conditional rendering for authentication and loading
        if (isLoading) {
            return <div>Loading authentication...</div>;
        }
        console.log(user)
        return user.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/login"} element={<Login />} />
                <Route element={<ProtectedRoute />} >
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/about"} element={<h1>About</h1>} />
                    <Route path={"/profile"} element={<h1>Profile</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
