import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Login } from "./Login.jsx";
import Home from "./Home.jsx";
import { Stack } from "@mui/system";
import Sidebar from "../Components/Sidebar.jsx";


function Layout() {
    return (
        <Stack direction={"row"}>
            <Sidebar />
            <Outlet />
        </Stack>
    )
}

export function Base() {
    const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

    const ProtectedRoute = () => {
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/login"} element={<Login />} />
                <Route element={<ProtectedRoute />} >
                    <Route path="/" element={<Layout />} >
                        <Route path={"/"} element={<Home />} />
                        <Route path={"/about"} element={<h1>About</h1>} />
                        <Route path={"/profile"} element={<h1>Profile</h1>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
