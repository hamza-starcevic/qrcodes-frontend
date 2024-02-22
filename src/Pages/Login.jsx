import { Stack, ListItem } from "@mui/material";
import { LoginForm } from "../Components/LoginForm.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { finishLoading, startLoading } from "../redux/reducers/loadingSlice.js";


export function Login() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startLoading());
        if (isLoggedIn) {
            navigate("/");
        } else {
            dispatch(finishLoading());
        }
    }, [isLoggedIn]);

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