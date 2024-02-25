import React, { useState, useEffect } from "react";
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
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const PredmetForm = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const dispatch = useDispatch();
  const [predmets, setPredmets] = useState([]);
  const formik = useFormik({
    initialValues: {
      broj_predavanja: "",
      predmet_id: "",
      status: "Nije odrzano",
      qrcode: "",
      datumPredavanja: "",
    },
    onSubmit: async (values) => {
        const date = new Date(selectedDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        values.datumPredavanja = `${year}-${month}-${day}`;
         values.qrcode = generateRandomString(10);
      values.broj_predavanja = parseInt(values.broj_predavanja);
      console.log(values);
      dispatch(startLoading());
      try {
        const res = await axios.post(
          config.BASE_URL + "api/predavanje/create",
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

  useEffect(() => {
    const fetchPredmets = async () => {
      try {
        const response = await axios.get(config.BASE_URL + "api/predmet/all");
        setPredmets(response.data); 
      } catch (error) {
        console.error("Error fetching predmets:", error);
      }
    };

    fetchPredmets();
  }, []);

  return (
    <Card
      sx={{
        height: "70vh",
        bgcolor: commons.color.themeGray,
      }}
    >
      <CardHeader title="Unos podataka novog predavanja" />
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Broj predavanja"
            name="broj_predavanja"
            value={formik.values.broj_predavanja}
            onChange={formik.handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{paddingTop:"5vh"}}>
              <DateField
                label="Datum predavanja"
                value={selectedDate}
                onChange={setSelectedDate}
              />
            </div>
          </LocalizationProvider>
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="predmet-label">Predmet</InputLabel>
            <Select
              labelId="predmet-label"
              id="predmet-select"
              value={formik.values.predmet_id}
              label="Predmet"
              onChange={formik.handleChange}
              name="predmet_id"
            >
              {predmets.map((predmet) => (
                <MenuItem key={predmet.id} value={predmet.id}>
                  {predmet.naziv}
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
