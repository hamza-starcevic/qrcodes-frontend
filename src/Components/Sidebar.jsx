import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from "react-router-dom";

const MenuItems = [
    {
        text: "Home",
        icon: <HomeIcon color="primary" />,
        path: "/"
    },
    {
        text: "About",
        icon: <InfoIcon color="primary" />,
        path: "/about"
    },
    {
        text: "Logout",
        icon: <LogoutIcon color="primary" />,
        path: "/login"
    }
]

function Sidebar() {
    return (
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
                        <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default Sidebar