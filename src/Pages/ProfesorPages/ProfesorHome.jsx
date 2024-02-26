import { Link } from 'react-router-dom'
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { finishLoading, startLoading } from '../../redux/reducers/loadingSlice';
import axios from 'axios';
import config from '../../config';
import { selectUser } from '../../redux/reducers/userSlice';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Card, Container, Stack, Typography } from '@mui/material'
import { setSubjectId } from '../../redux/reducers/utilSlice';

const BASE_URL = config.BASE_URL

function generateRandomColorHash() {
    // Generate a random hexadecimal character (0-9, A-F)  
    let randomHexDigit = () => Math.floor(Math.random() * 16).toString(16);

    // Generate a complete 6-digit hex color code
    let hexCode = '#';
    for (let i = 0; i < 6; i++) {
        hexCode += randomHexDigit();
    }

    return hexCode;
}

function ProfesorHome() {
    const [predmeti, setPredmeti] = useState([])
    const [activeSubject, setActiveSubject] = useState({})
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const handleSubjectSelect = (predmet) => {
        setActiveSubject(predmet)
        dispatch(setSubjectId(predmet.id))
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(startLoading())
                const res = await axios.get(`${BASE_URL}api/predmet/${user.id}`)
                setPredmeti(res.data)
            } catch (error) {
                console.log(error)
            } finally {
                dispatch(finishLoading())
            }
        }
        fetchData()
        console.log(predmeti)
        // Fetch data from API
    }, [])
    return (
        <Container
            sx={{
                bgcolor: "whiteSmoke",
                height: "100vh",
                width: "100%",
            }}
        >
            {/*stack za kartice*/}
            <Stack
                direction={"row"}
                padding={"10vh 0 0 0"}
                gap={10}
                sx={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >

                {predmeti.map((predmet) => {
                    let randomColor = generateRandomColorHash()
                    return (
                        <Link
                            key={predmet.id}
                            onClick={() => handleSubjectSelect(predmet)}
                            to={"/profesor/predmet"}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >

                            <Card
                                sx={{
                                    display: "flex",
                                    bgcolor: randomColor,
                                    width: "40vh",
                                    height: "25vh",
                                    alignItems: "center",
                                    flexDirection: "column",
                                }}
                            >
                                <div
                                    style={{
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                    }}
                                >
                                    <AutoStoriesIcon
                                        sx={{ fontSize: "15vh", color: "whitesmoke" }}
                                    ></AutoStoriesIcon>
                                </div>
                                <Card
                                    sx={{
                                        alignSelf: "flex-end",
                                        width: "100%",
                                        height: "5vh",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "1vh",
                                    }}
                                >
                                    <Typography>{predmet.naziv}</Typography>
                                    <KeyboardTabIcon />
                                </Card>
                            </Card>
                        </Link>)
                })}

            </Stack>
        </Container>
    )
}

export default ProfesorHome