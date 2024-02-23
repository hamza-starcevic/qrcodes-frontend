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
import {
  DateCalendar,
  DateField,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";

const years = Array.from({ length: 6 }, (_, i) => i + 1);

const KorisnikForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      ime: "",
      prezime: "",
      email: "",
      password: "",
      role: "",
    },
    onSubmit: async (values) => {
      console.log("hi");
      dispatch(startLoading());
      try {
        const res = await axios.post(
          config.BASE_URL + "/api/user/create",
          values
        );
        console.log(res.data);
        dispatch(finishLoading());
      } catch (error) {
        dispatch(finishLoading());
      } finally {
        dispatch(finishLoading());
      }
    },
  });

  return (
    <Card
      sx={{
        height: "70vh",
        bgcolor: commons.color.themeGray,
      }}
    >
      <CardHeader title="Unos podataka novog korisnika" />
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Ime"
            name="ime"
            value={formik.values.ime}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            label="Prezime"
            name="prezime"
            value={formik.values.prezime}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            label="Role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            name="pasword"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          
          <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            Snimi
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default KorisnikForm;
