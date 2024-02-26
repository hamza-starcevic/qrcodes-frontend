import QRCode from "qrcode.react";
import config, { commons } from "../config";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { finishLoading, startLoading } from "../redux/reducers/loadingSlice";
import axios from "axios";
import PredavanjeForm from "../Components/PredavanjeForm";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  py: 4,
};

const PregledPredavanja = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [predmetiData, setPredmetiData] = useState([]);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [qrCodeData, setQrCodeData] = useState("");
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [activeRow, setActiveRow] = useState({});
  const dispatch = useDispatch();

  async function fetchData() {
    try {
      dispatch(startLoading());
      const predavanjaRes = await axios.get(
        config.BASE_URL + "api/predavanje/all"
      );
      const predmetiRes = await axios.get(config.BASE_URL + "api/predmet/all");
      setTableData(predavanjaRes.data);
      setPredmetiData(predmetiRes.data);
      console.log(predavanjaRes.data);
      console.log(predmetiRes.data);
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
                    {column.label}
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
                        predmetiData.find(
                          (predmet) => predmet.id === row.predmet_id
                        )?.naziv
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
            <PredavanjeForm predmetId={''} />
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
            width: "fit-content",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
          }}
        >
          <QRCode value={qrCodeData} />
        </Container>
      </Modal>
    </Container>
  );
};

export default PregledPredavanja;
