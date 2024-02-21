import { Stack, ListItem } from "@mui/material";
import { LoginForm } from "../Components/LoginForm.jsx";


export function Login() {

    return <Stack spacing={0} sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "white",
        flexDirection: "column",

    }}>
        <ListItem sx={
            {
                backgroundColor: "#182138",
                padding: "5vh 0 0 0",
            }

        }>Header</ListItem>
        <ListItem sx={{
            flexGrow: 1,
        }}><LoginForm /></ListItem>
        <ListItem sx={
            {
                backgroundColor: "#182138",
                padding: "10vh 0 0 0",
            }

        }>Footer</ListItem>
    </Stack>
}