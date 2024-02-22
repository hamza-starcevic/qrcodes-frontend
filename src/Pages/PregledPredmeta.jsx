import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Stack, Card, CardHeader, Button, Snackbar, Alert, Modal, Fade, Box } from '@mui/material';
import config, { commons } from '../config';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { finishLoading, startLoading } from '../redux/reducers/loadingSlice';
import axios from 'axios';
import PredmetForm from '../Components/PredmetForm';

const columns = [
    { id: 'order', label: 'Rb.', minWidth: 50, align: 'center' },
    { id: 'naziv', label: 'Naziv', minWidth: 100, align: 'center' },
    { id: 'profesor', label: 'Profesor', minWidth: 100, align: 'center' },
    { id: 'godinaStudija', label: 'Godina Studija', minWidth: 100, align: 'center' },
];

const style = { // Modal Styling
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60vh", // Adjust width as needed
    bgcolor: 'background.paper',
    boxShadow: 24,
    py: 4

};

const PregledPredmeta = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [tableData, setTableData] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startLoading());
        async function fetchData() {
            try {
                const res = await axios.get(config.BASE_URL + 'api/predmet/all');
                setTableData(res.data);
                console.log(res.data);
            } catch (error) {
                setToastMessage(error.response?.data.detail ?? "Problem u pristupu serveru");
                setOpenToast(true);
            } finally {
                dispatch(finishLoading());
            }
        }
        fetchData();
        tableData.forEach((predmet) => {
            const profImena = ''
            if (predmet.profesori) {
                predmet.profesori.forEach((profesor) => {
                    profImena.concat(profesor + ', ')
                })
            }
            if (profImena.endsWith(', ')) {
                profImena.slice(0, -2);
            }
            predmet.profesor = profImena;
        });
    }, []);
    return (
        <Container maxWidth="lg">
            <Stack spacing={6} paddingTop={5}>
                <Card sx={
                    {
                        bgcolor: commons.color.themeGray,
                    }
                }>
                    <Stack direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
                        <CardHeader title="Pregled predmeta" />
                        <Button onClick={handleOpen} variant="contained" color='success' sx={{ my: '1.5vh', mr: '3vh' }}>
                            Dodaj novi predmet
                        </Button>
                    </Stack>
                </Card>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow sx={{
                                bgcolor: commons.color.themeDarkBlue,
                            }}>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth, color: 'white' }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody sx={
                            {
                                bgcolor: commons.color.themeGray,
                            }
                        }>
                            {tableData.map((row) => (
                                <TableRow key={row.id}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.id === 'order' ? tableData.indexOf(row) + 1 : row[column.id]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
            <Snackbar
                open={openToast}
                autoHideDuration={5000} // Adjust duration as needed
                onClose={() => setOpenToast(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="error" onClose={() => setOpenToast(false)}>
                    {toastMessage}
                </Alert>
            </Snackbar>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition


            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Container maxWidth="xs">
                            <PredmetForm />
                        </Container>
                    </Box>
                </Fade>
            </Modal>
        </Container >

    );
};

export default PregledPredmeta;
