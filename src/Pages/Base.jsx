import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'; 
import { SubjectOutlined } from "@mui/icons-material";
import { Login } from "./Login.jsx";
import Home from "./Home.jsx";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Divider from '@mui/material/Divider';


export function Base() {
    const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

    const ProtectedRoute = () => {
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
    }

    const MenuItems = [
        {
            text: "Home",
            icon: <HomeIcon color="primary"/>,
            path: "/"
        },
        {
            text: "About",
            icon: <InfoIcon color="primary"/>,
            path: "/about"
        },
        {
            text: "Logout",
            icon: <LogoutIcon color="primary"/>,
            path: "/login"
        }
    ]

    const drawer = isAuthenticated && (
            <Drawer
                open={true} 
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        bgcolor: '#2c3e50', // Darker background color
                        color: "#fff", // White text color
                        borderRadius: 1, // Slightly rounded corners
                        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)' // Subtle shadow
                    },
                }}
                variant="permanent"
            >
                <Stack spacing={2} alignItems="center" paddingTop={2}>
                    <AccountBoxIcon sx={{ fontSize: "15vh", color: "whitesmoke" }} />
                    <Typography variant="h6">Username</Typography>
                </Stack>
                <Divider sx={{ bgcolor: 'white' }} />
                <List>
                {MenuItems.map(item => (
                    <ListItem
                        button
                        key={item.text}
                    >
                        <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection:'row', alignItems:"center", justifyContent:"center" }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </Link>
                    </ListItem>
                ))}
            </List>
            </Drawer>
        );

    return (
        <BrowserRouter>
            <div style={{ display: 'flex' }}>
                {drawer}
                <Routes>
                    <Route path={"/login"} element={<Login />} />
                    <Route element={<ProtectedRoute />} >
                        <Route path={"/"} element={<Home />} />
                        <Route path={"/about"} element={<h1>About</h1>} />
                        <Route path={"/profile"} element={<h1>Profile</h1>} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}
