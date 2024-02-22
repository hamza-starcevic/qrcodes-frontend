import { useFormik } from "formik";
import { Alert, Box, Button, Card, Container, CssBaseline, Snackbar, Stack, TextField, Typography } from "@mui/material";
import config from "../config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BASE_URL = config.BASE_URL;
export function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async values => {
            try {

                const res = await axios.post(BASE_URL + "api/user/login", values)
                if (res.status === 200) {
                    dispatch(login(res.data));
                    navigate("/");
                } else {
                    setToastMessage(res.data.detail);
                    setOpenToast(true)
                }
            }
            catch (error) {
                setToastMessage(error.response?.data.detail ?? "Problem u pristupu serveru");
                setOpenToast(true)
            }
        },

    })
    return (
        <Container component={"main"} maxWidth={"xs"} sx={
            {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2vh 0 2vh 0",
            }
        }>
            <CssBaseline />
            <Card sx={{
                bgcolor: "#F5F5F5",
                width: "84vh",
                height: "70vh"
            }}>
                <Stack direction={"column"} spacing={4} padding={"0 3vh 0 3vh"}>
                    <Stack spacing={0} gap={4} sx={{
                        flexDirection: "row",
                        padding: "2vh 0 0 0",
                        alignItems: "center",
                        display: "flex",
                    }}>
                        <Box sx={{
                            width: "0.5vh",
                            height: "10vh",
                            bgcolor: "#00426C",
                            color: "#00426C",
                        }} >I</Box>


                        <Typography component={"h1"} variant={"h3"} sx={{
                            fontStyle: "bold",
                        }}>Prijava</Typography>
                    </Stack>
                    <Typography component={"p"} variant={"p"}>
                        Molimo vas prijavite se kako bi koristili našu aplikaciju
                    </Typography>
                    <Stack component={"form"} onSubmit={formik.handleSubmit} noValidate spacing={4} paddingTop={"2.5vh"}>
                        <TextField
                            autoComplete="email"
                            name="email"
                            required
                            fullWidth
                            id="email"
                            label="Email adresa"
                            autoFocus
                            sx={{
                                bgcolor: "white",
                            }}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <TextField
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete="password"
                            sx={{
                                bgcolor: "white",
                            }}
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: "#00426C",
                                color: "white",
                            }}
                        >Prijavite se</Button>
                    </Stack>
                </Stack>
            </Card>
            <Snackbar
                open={openToast}
                autoHideDuration={3000} // Adjust duration as needed
                onClose={() => setOpenToast(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="error" onClose={() => setOpenToast(false)}>
                    {toastMessage}
                </Alert>
            </Snackbar>
        </Container >
    );
}
