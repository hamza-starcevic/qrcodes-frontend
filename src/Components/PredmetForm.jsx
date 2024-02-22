import * as React from "react";
import { useFormik } from "formik";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { commons } from "../config";

const years = Array.from({ length: 6 }, (_, i) => i + 1);

const PredmetForm = () => {
    const formik = useFormik({
        initialValues: {
            naziv: "",
            godinaStudija: "",
        },
        onSubmit: (values) => {
            // Handle form submission here
            console.log("Submitting form:", values);
        },
    });

    return (
        <Card sx={{
            height: "70vh",
            bgcolor: commons.color.themeGray
        }}>
            <CardHeader title="Unos podataka novog predmeta" />
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        label="Naziv predmeta"
                        name="naziv"
                        value={formik.values.naziv}
                        onChange={formik.handleChange}
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel variant="filled" id="godina-studija-label">Godina studija</InputLabel>
                        <Select
                            labelId="godina-studija-label"
                            name="godinaStudija"
                            value={formik.values.godinaStudija}
                            onChange={formik.handleChange}
                        >
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                        Snimi
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default PredmetForm;
