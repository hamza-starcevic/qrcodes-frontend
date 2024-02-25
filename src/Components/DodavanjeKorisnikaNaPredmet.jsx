import { Button, Card, Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import config, { commons } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { finishLoading, startLoading } from "../redux/reducers/loadingSlice";
import axios from "axios";
import { wipeSubjectId } from "../redux/reducers/utilSlice";
import { useNavigate } from "react-router";

const DodavanjeKorisnikaNaPredmet = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let subjectId = useSelector((state) => state.util.subjectId.payload);
    const [role, setRole] = useState('');
    const [users, setUsers] = useState([]);
    const formik = useFormik({
        initialValues: {
            user: {},
        },
        onSubmit: async (values) => {
            let payload = {
                predmetId: subjectId,
                korisnikId: values.user.id
            }
            console.log(values)
            console.log(payload)
            dispatch(startLoading());
            try {
                const res = await axios.post(config.BASE_URL + "api/predmet/korisnik", payload)
                console.log(res.data);
            }

            catch (error) {
                dispatch(finishLoading());
            } finally {
                dispatch(finishLoading());
                dispatch(wipeSubjectId());
                navigate('/predmeti');
            }
        },
    });

    const handleRoleChange = (event) => {
        setRole(event.target.value);
        fetchUsers(event.target.value);
    };

    const fetchUsers = async (role) => {
        // Replace with your fetch logic to get users by role
        try {
            dispatch(startLoading());
            const response = await axios.get(`${config.BASE_URL}api/user/role/${role}`);
            setUsers(response.data);
        } catch (error) {
            alert('Error fetching users');
        } finally {
            dispatch(finishLoading());
        }
    };

    return (
        <Container maxWidth="md">
            <Card
                sx={{
                    mt: 5,
                    p: 3,
                    bgcolor: commons.color.themeGray,
                }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <FormControl fullWidth sx={{ my: 2 }}>
                        <InputLabel>Odaberi ulogu</InputLabel>
                        <Select value={role} onChange={handleRoleChange}>
                            <MenuItem value="profesor">Profesor</MenuItem>
                            <MenuItem value="student">Student</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ my: 2 }}>
                        <InputLabel>Odaberi korisnika</InputLabel>
                        <Select value={formik.values.user ?? ''} name="user" onChange={formik.handleChange}>
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user}>
                                    {user.firstName} {user.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Dodaj korisnika
                    </Button>
                </form>
            </Card>
        </Container>
    );
};

export default DodavanjeKorisnikaNaPredmet;