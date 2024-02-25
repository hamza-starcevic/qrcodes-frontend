import { Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from "react-router-dom";
import { commons } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/reducers/userSlice";
import { bgcolor } from "@mui/system";


const MenuItems = [
    {
        text: "Home",
        icon: <HomeIcon sx={{ color: "white" }} />,
        path: "/"
    },
    {
        text: "About",
        icon: <InfoIcon sx={{ color: "white" }} />,
        path: "/about"
    },
    // {
    //     text: "Logout",
    //     icon: <LogoutIcon sx={{ color: "white" }} onClick={handleLogout()} />,
    //     path: "/login"
    // }
]

function Sidebar() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <Drawer
            open={true}
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    bgcolor: commons.color.themeDarkBlue, // Darker background color
                    color: "#fff", // White text color
                    borderRadius: 0, // Slightly rounded corners
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)' // Subtle shadow
                },
            }}
            variant="permanent"
        >
            <Stack spacing={2} alignItems="center" paddingTop={2}>
                <AccountBoxIcon sx={{ fontSize: "15vh", color: "whitesmoke" }} />
                <Typography variant="h6">{user.firstName + ' ' + user.lastName}</Typography>
            </Stack>
            <Divider sx={{ bgcolor: 'white', mx: "1vh" }} />
            <List>
                <Stack direction={"column"} spacing={2} padding={2} alignItems="center">
                    {MenuItems.map(item => (
                        <ListItem
                            key={item.text}
                            sx={{
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            <Button
                                fullWidth
                                variant="text"
                                color="inherit"
                                sx={{

                                    margin: 0,

                                    '&:hover': {
                                        bgcolor: commons.color.themeTourquise,
                                        color: "white"
                                    }
                                }}
                            >

                                <Link to={item.path} style={{ width: '30vh', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "flex-end" }}>
                                    <ListItemIcon >{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </Link>
                            </Button>
                        </ListItem>
                    ))}
                    <ListItem>
                        <Button
                            fullWidth
                            variant="text"
                            color="inherit"
                            onClick={handleLogout}
                            sx={{

                                margin: 0,

                                '&:hover': {
                                    bgcolor: commons.color.themeTourquise,
                                    color: "white"
                                }
                            }}>
                            <Link to={"/"} style={{ width: '30vh', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "flex-end" }}>
                                <ListItemIcon ><LogoutIcon sx={{ color: "white" }} /></ListItemIcon>
                                <ListItemText primary={"Logout"} />
                            </Link>
                        </Button>
                    </ListItem>
                </Stack>
            </List>
        </Drawer >
    )
}

export default Sidebar