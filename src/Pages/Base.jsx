import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import {Login} from "./Login.jsx";

export function Base() {
    const ProtectedRoute = () => {
        const isAuthenticated = useSelector((state) => state.user.isLoggedIn);
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
    }
    return (
        <BrowserRouter>
            <Routes>
            <Route path={"/login"} element={<Login />} />
            <Route element={<ProtectedRoute />} >
                <Route path={"/"} element={<h1>Home</h1>} />
                <Route path={"/about"} element={<h1>About</h1>} />
                <Route path={"/profile"} element={<h1>Profile</h1>} />
            </Route>
            </Routes>
        </BrowserRouter>
    )
}
