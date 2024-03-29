import * as React from "react";
import { useFormik } from "formik";
import config, { commons } from "../config";
import { useDispatch } from "react-redux";
import { finishLoading, startLoading } from "../redux/reducers/loadingSlice";
import axios from "axios";
import { useState } from "react";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";



const years = Array.from({ length: 6 }, (_, i) => i + 1);

const KorisnikForm = ({
  data, handleTableData, handleClose
}) => {
  const [selectedDate, setSelectedDate] = useState('');

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    },
    onSubmit: async (values) => {
      const date = new Date(selectedDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');
      values.dateOfBirth = `${year}-${month}-${day}`;
      dispatch(startLoading());
      try {
        const res = await axios.post(
          config.BASE_URL + "api/user/create",
          values
        );
        console.log(res.data)
        handleTableData(res.data);
        dispatch(finishLoading());
      } catch (error) {
        dispatch(finishLoading());
      } finally {
        dispatch(finishLoading());
        handleClose();
      }
    },
  });

  return (
    <Card
      sx={{
        height: "80vh",
        bgcolor: commons.color.themeGray,
      }}
    >
      <CardHeader title="Unos podataka novog korisnika" />
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack gap={2}>
            <TextField
              fullWidth
              label="Ime"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              label="Prezime"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <FormControl>
              <InputLabel variant="filled" id="godina-studija-label">Role</InputLabel>
              <Select
                labelId="godina-studija-label"
                label="Role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
              >

                <MenuItem key={"profesor"} value={"profesor"}>
                  Profesor
                </MenuItem>
                <MenuItem key={"student"} value={"student"}>
                  Student
                </MenuItem>
                <MenuItem key={"admin"} value={"admin"}>
                  Admin
                </MenuItem>

              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div>
                <DateField label="Datum rodjenja" value={selectedDate} onChange={setSelectedDate} />
              </div>
            </LocalizationProvider>
            <Button type="submit" variant="contained" sx={{ mt: 3 }}>
              Snimi
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card >
  );
};

export default KorisnikForm;
