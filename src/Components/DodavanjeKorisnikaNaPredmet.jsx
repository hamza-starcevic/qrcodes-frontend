import { Card, Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import config from "../config";
import { useDispatch } from "react-redux";
import { finishLoading, startLoading } from "../redux/reducers/loadingSlice";
import axios from "axios";

const DodavanjeKorisnikaNaPredmet = () => {
    const dispatch = useDispatch();
    const [role, setRole] = useState('');
    const [users, setUsers] = useState([]);
    const formik = useFormik({
        initialValues: {
            predmetId: "",
            korisnikId: "",
        },
        onSubmit: async (values) => {
            console.log('hi')
            dispatch(startLoading());
            try {
                const res = await axios.post(config.BASE_URL + "api/predmet/create", values)
                console.log(res.data);
                dispatch(finishLoading());
            }

            catch (error) {
                dispatch(finishLoading());
            } finally {
                dispatch(finishLoading());
                setOpen(false);
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
        <Container maxWidth="lg">
            <Card>
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
                        <Select value={formik.values.korisnikId} name="korisnikId" onChange={formik.handleChange}>
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.firstName} {user.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* Add submit button */}
                </form>
            </Card>
        </Container>
    );
};

export default DodavanjeKorisnikaNaPredmet;