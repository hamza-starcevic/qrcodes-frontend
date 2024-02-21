import { useFormik } from "formik";
import { Box, Button, Card, Container, CssBaseline, Stack, TextField, Typography } from "@mui/material";
import config from "../config";

const BASE_URL = config.BASE_URL;
export function LoginForm() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
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
        </Container >
    );
}
