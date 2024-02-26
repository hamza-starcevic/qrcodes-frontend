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
import config, { commons } from "../config";
import { useDispatch } from "react-redux";
import { finishLoading, startLoading } from "../redux/reducers/loadingSlice";
import axios from "axios";

const years = Array.from({ length: 6 }, (_, i) => i + 1);

const PredmetForm = ({ handleClose, updateData }) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            naziv: "",
            godinaStudija: "",
        },
        onSubmit: async (values) => {
            console.log('hi')
            dispatch(startLoading());
            try {
                const res = await axios.post(config.BASE_URL + "api/predmet/create", values)
                updateData(res.data);
                dispatch(finishLoading());
            }

            catch (error) {
                dispatch(finishLoading());
            } finally {
                handleClose();
                dispatch(finishLoading());
            }
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
