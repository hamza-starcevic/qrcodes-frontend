import React from 'react'
import { useSelector } from 'react-redux'
import QRCode from "qrcode.react";
import config, { commons } from "../../config";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { finishLoading, startLoading } from "../../redux/reducers/loadingSlice";
import axios from "axios";
import PredavanjeForm from "../../Components/PredavanjeForm";
import SettingsIcon from "@mui/icons-material/Settings";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    Stack,
    Card,
    CardHeader,
    Button,
    Snackbar,
    Alert,
    Modal,
    Fade,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";

const columns = [
    { id: "order", label: "Rb.", minWidth: 50, align: "center" },
    {
        id: "datumPredavanja",
        label: "Datum predavanja",
        minWidth: 100,
        align: "center",
    },
    { id: "predmet", label: "Predmet", minWidth: 100, align: "center" },
    { id: "actions", label: "Opcije", minWidth: 80, align: "center" },
];


function ProfesorPredmet() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [predmetiData, setPredmetiData] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [qrCodeData, setQrCodeData] = useState("");
    const [qrModalOpen, setQrModalOpen] = useState(false);
    const [activeRow, setActiveRow] = useState({});
    const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
    const [currentAttendanceData, setCurrentAttendanceData] = useState(null);
    const dispatch = useDispatch();

    const openAttendanceModal = (rowData) => {
        setCurrentAttendanceData(rowData); // Assuming attendance is linked to rowData
        setAttendanceModalOpen(true);
    };
    let predmetId = useSelector((state) => state.util.subjectId.payload);

    const fetchData = async () => {
        try {
            dispatch(startLoading());
            const predavanjaRes = await axios.get(config.BASE_URL + "api/predavanje/" + predmetId + "/predmet");
            setTableData(predavanjaRes.data);
        } catch (error) {
            setToastMessage(
                error.response?.data.detail ?? "Problem u pristupu serveru"
            );
            setOpenToast(true);
        } finally {
            dispatch(finishLoading());
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleClick = (event, row) => {
        setActiveRow(row);
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const addToData = (newData) => {
        setTableData([...tableData, newData]);
    };
    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const generateQRCode = (data) => {
        setQrCodeData(activeRow.id);
        setQrModalOpen(true);
    };


    return (
        <Container maxWidth="lg">
            <Stack spacing={6} paddingTop={5}>
                <Card
                    sx={{
                        bgcolor: commons.color.themeGray,
                    }}
                >
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignContent={"center"}
                    >
                        <CardHeader title="Pregled predavanja" />
                        <Button
                            onClick={handleOpen}
                            variant="contained"
                            color="success"
                            sx={{ my: "1.5vh", mr: "3vh" }}
                        >
                            Dodaj novo predavanje
                        </Button>
                    </Stack>
                </Card>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow
                                sx={{
                                    bgcolor: commons.color.themeDarkBlue,
                                }}
                            >
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        sx={{ minWidth: column.minWidth, color: "white" }}
                                    >
                                        {column.id === "predmet" ? "Prisustvo" : column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody
                            sx={{
                                bgcolor: commons.color.themeGray,
                            }}
                        >
                            {tableData.map((row) => (
                                <TableRow key={row.id}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.id === "order" ? (
                                                tableData.indexOf(row) + 1
                                            ) : column.id === "actions" ? (
                                                <>
                                                    <IconButton
                                                        onClick={(event) => handleClick(event, row)}
                                                    >
                                                        <SettingsIcon />
                                                    </IconButton>
                                                    <Menu
                                                        anchorEl={anchorEl}
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleCloseMenu}
                                                    >
                                                        <MenuItem onClick={() => handleDeleteSubject(row)}>
                                                            Obriši predavanje
                                                        </MenuItem>
                                                        <MenuItem
                                                            onClick={() => generateQRCode(row.id)}
                                                        >
                                                            QR Code
                                                        </MenuItem>
                                                    </Menu>
                                                </>
                                            ) : column.id === "predmet" ? (
                                                <Button onClick={() => openAttendanceModal(row)}>
                                                    Pogledaj prisustva
                                                </Button>
                                            ) : (
                                                row[column.id]
                                            )}
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
                autoHideDuration={5000}
                onClose={() => setOpenToast(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="error" onClose={() => setOpenToast(false)}>
                    {toastMessage}
                </Alert>
            </Snackbar>
            <Modal open={open} onClose={handleClose} closeAfterTransition>
                <Fade in={open}>

                    <Container maxWidth="xs">
                        <PredavanjeForm predmetId={predmetId} handleClose={handleClose} addToData={addToData} />
                    </Container>

                </Fade>
            </Modal>
            <Modal open={qrModalOpen} onClose={() => setQrModalOpen(false)}>
                <Container
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "50vh",
                        height: "50vh",
                        bgcolor: "white",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 4,
                    }}
                >
                    <QRCode value={qrCodeData} style={{
                        width: "100%",
                        height: "100%",
                    }} />
                </Container>
            </Modal>
            <Modal open={attendanceModalOpen} onClose={() => setAttendanceModalOpen(false)}>
                <Fade in={attendanceModalOpen}>
                    <Container maxWidth="xs">
                        {/* Replace with the component to display attendance list */}
                        <AttendanceList attendanceData={currentAttendanceData} />
                    </Container>
                </Fade>
            </Modal>
        </Container>
    )
}
const AttendanceList = ({ attendanceData, closeModal }) => {
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        try {
            const res = await axios.get(config.BASE_URL + "api/predavanje/" + attendanceData.id + "/prisutni");
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    useEffect(() => {
        try {
            fetchUsers();
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, []);
    return (
        <Card sx={
            {
                bgcolor: commons.color.themeGray,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80vh",
                height: "80vh",
                p: 4,
                position: "absolute",
            }
        }>
            <Stack spacing={6} paddingTop={5}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead sx={{ bgcolor: commons.color.themeDarkBlue }}>
                            <TableRow>
                                <TableCell sx={{ minWidth: 150, color: "white", }} align="center">
                                    Ime
                                </TableCell>
                                <TableCell sx={{ minWidth: 150, color: "white" }} align="center">
                                    Prezime
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ bgcolor: commons.color.themeGray }}>
                            {users.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">
                                        {row.imePrezime.split(" ")[0]}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.imePrezime.split(" ")[1]}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Card>
    );
};
export default ProfesorPredmet