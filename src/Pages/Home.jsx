import { Card, Container, Drawer, ListItemIcon, Stack, Typography } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EventIcon from '@mui/icons-material/Event';
import { Link } from "react-router-dom";

function Home() {
    return (
        < Container sx={{
            bgcolor: "whiteSmoke",
            height: "100vh",
            width: "100%"
        }}>
            {/*stack za kartice*/}
            <Stack direction={"row"} padding={"10vh 0 0 0"} gap={10} sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
            }}>

                {/*korisnici */}
                <Link to={"/korisnici"} style={{
                    textDecoration: 'none',
                    color: 'inherit'

                }}>
                <Card sx={{
                    display: "flex",
                    bgcolor: "#5cab7d",
                    width: "40vh",
                    height: "25vh",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <AccountCircleIcon sx={{ fontSize: "15vh", color: "whitesmoke" }}></AccountCircleIcon>
                    </div>
                    <Card sx={{ alignSelf: 'flex-end', width: '100%', height: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "1vh" }}>
                        <Typography>
                            Korisnici
                        </Typography>
                        <KeyboardTabIcon />
                    </Card>
                </Card>
                </Link>

                {/*predmeti */}
                <Link to={"/predmeti"} style={{
                    textDecoration: 'none',
                    color: 'inherit'

                }}>
                    <Card sx={{
                        display: "flex",
                        bgcolor: "#233d4d",
                        width: "40vh",
                        height: "25vh",
                        alignItems: "center",
                        flexDirection: "column"
                    }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <AutoStoriesIcon sx={{ fontSize: "15vh", color: "whitesmoke" }} />
                        </div>
                        <Card sx={{ alignSelf: 'flex-end', width: '100%', height: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "1vh" }}>
                            <Typography>
                                Predmeti
                            </Typography>
                            <KeyboardTabIcon />
                        </Card>
                    </Card>
                </Link>
                {/*predavanja */}
                <Card sx={{
                    display: "flex",
                    bgcolor: "#fcca46",
                    width: "40vh",
                    height: "25vh",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <EventIcon sx={{ fontSize: "15vh", color: "whitesmoke" }} />
                    </div>
                    <Card sx={{ alignSelf: 'flex-end', width: '100%', height: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "1vh" }}>
                        <Typography>
                            Predavanja
                        </Typography>
                        <KeyboardTabIcon />
                    </Card>
                </Card>
            </Stack>

            <Stack>
                <Stack direction={"row"} padding={"10vh 0 0 0"} gap={10} sx={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}>

                    {/*korisnici */}
                    <Card sx={{
                        display: "flex",
                        bgcolor: "white",
                        width: "150vh",
                        height: "50vh",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5vh",
                        flexDirection: "row"
                    }}>
                        <Card sx={{ width: '100%', height: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "1vh" }}>
                            <Typography>
                                1
                            </Typography>
                        </Card>

                        <Card sx={{ width: '100%', height: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "1vh" }}>
                            <Typography>
                                2
                            </Typography>
                        </Card>

                        <Card sx={{ borderRight: "50vh", width: '100%', height: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "1vh" }}>
                            <Typography>
                                3
                            </Typography>
                        </Card>
                    </Card>
                </Stack>
            </Stack>
        </Container>
    )
}

export default Home