import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Stack, Card, CardHeader, Button, Snackbar, Alert, Modal, Fade, Box, IconButton, Menu, MenuItem } from '@mui/material';
import config, { commons } from '../config';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { finishLoading, startLoading } from '../redux/reducers/loadingSlice';
import axios from 'axios';
import KorisnikForm from '../Components/KorisnikForm';
import SettingsIcon from '@mui/icons-material/Settings';

const columns = [
    { id: 'order', label: 'Rb.', minWidth: 50, align: 'center' },
    { id: 'firstName', label: 'Ime', minWidth: 100, align: 'center' },
    { id: 'lastName', label: 'Prezime', minWidth: 100, align: 'center' },
    { id: 'email', label: 'Email', minWidth: 100, align: 'center' },
    { id: 'role', label: 'Role', minWidth: 100, align: 'center' },
    { id: 'actions', label: 'Opcije', minWidth: 80, align: 'center' },
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

const PregledKorisnika = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event, row) => {
        setActiveRow(row);
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDeleteSubject = async () => {
        try {
            let id = activeRow.id;
            const res = await axios.delete(config.BASE_URL + 'api/user/delete/' + id);
            setTableData(tableData.filter((item) => item.id !== id));
            handleCloseMenu();
            setToastMessage("Korisnik uspješno obrisan");
            setOpenToast(true);
        } catch (error) {
            setToastMessage(error.response?.data.detail ?? "Problem u pristupu serveru");
            setOpenToast(true);
        }
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [tableData, setTableData] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [activeRow, setActiveRow] = useState({});
    const dispatch = useDispatch();
    const handleTableData = (data) => {
        setTableData([...tableData, data]);
    }
    useEffect(() => {
        dispatch(startLoading());
        async function fetchData() {
            try {
                const res = await axios.get(config.BASE_URL + 'api/user/all');
                setTableData(res.data);
            } catch (error) {
                setToastMessage(error.response?.data.detail ?? "Problem u pristupu serveru");
                setOpenToast(true);
            } finally {
                dispatch(finishLoading());
            }
        }
        fetchData();

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
                        <CardHeader title="Pregled korisnika" />
                        <Button onClick={handleOpen} variant="contained" color='success' sx={{ my: '1.5vh', mr: '3vh' }}>
                            Dodaj novog korisnika
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
                                            {column.id === 'order' ? tableData.indexOf(row) + 1 : column.id === 'actions'
                                                ? <>
                                                    <IconButton onClick={(event) => handleClick(event, row)}>
                                                        <SettingsIcon />
                                                    </IconButton>
                                                    <Menu
                                                        anchorEl={anchorEl} // State variable to store anchor element 
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleCloseMenu}
                                                    >
                                                        <MenuItem onClick={() => handleDeleteSubject()}>Obriši korisnika</MenuItem>
                                                    </Menu>
                                                </>
                                                : row[column.id]}
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
                            <KorisnikForm data={tableData} handleTableData={handleTableData} handleClose={handleClose} />
                        </Container>
                    </Box>
                </Fade>
            </Modal>
        </Container >

    );
};

export default PregledKorisnika;
