import { Card, Container, Stack, Typography } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EventIcon from '@mui/icons-material/Event';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { yellow } from "@mui/material/colors"

function Home() {
  return (
    < Container sx={{
        bgcolor:"whiteSmoke",
        width:"100%"
    }}>
        /*stack za korisnike */
        <Stack direction={"row"} padding={"10vh 0 0 0"} gap={25} sx={{
            width:"100%",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <Card sx={{
                    display: "flex",
                    bgcolor: "#5cab7d",
                    width: "50vh",
                    height: "25vh",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <PersonAddIcon sx={{fontSize:"15vh", color:"whitesmoke"}} />
                    </div>
                    <Card sx={{ alignSelf: 'flex-end', width: '100%', height: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap:"1vh" }}>
                        <Typography>
                            Kreirajte novog korisnika
                        </Typography>
                        <KeyboardTabIcon/>
                    </Card>
            </Card>
            <Card sx={{
                    display: "flex",
                    bgcolor: "#5cab7d",
                    width: "50vh",
                    height: "25vh",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <AccountCircleIcon sx={{fontSize:"15vh", color:"whitesmoke"}}></AccountCircleIcon>
                    </div>
                    <Card sx={{ alignSelf: 'flex-end', width: '100%', height: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap:"1vh" }}>
                        <Typography>
                            Pregled korisnika
                        </Typography>
                        <KeyboardTabIcon/>
                    </Card>
            </Card>
        </Stack>

        //stack za predmete
        <Stack direction={"row"} padding={"10vh 0 0 0"} gap={25} sx={{
            width:"100%",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <Card sx={{
                    display: "flex",
                    bgcolor: "#233d4d",
                    width: "50vh",
                    height: "25vh",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <BookmarkAddIcon sx={{fontSize:"15vh", color:"whitesmoke"}} />
                    </div>
                    <Card sx={{ alignSelf: 'flex-end', width: '100%', height: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap:"1vh" }}>
                        <Typography>
                            Kreirajte novi predmet
                        </Typography>
                        <KeyboardTabIcon/>
                    </Card>
            </Card>


            <Card sx={{
                    display: "flex",
                    bgcolor: "#233d4d",
                    width: "50vh",
                    height: "25vh",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <AutoStoriesIcon sx={{fontSize:"15vh", color:"whitesmoke"}} />
                    </div>
                    <Card sx={{ alignSelf: 'flex-end', width: '100%', height: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap:"1vh" }}>
                        <Typography>
                            Pregled predmeta
                        </Typography>
                        <KeyboardTabIcon/>
                    </Card>
            </Card>


        </Stack>

        //stack za predavanja
        <Stack direction={"row"} padding={"10vh 0 10vh 0"} gap={25} sx={{
            width:"100%",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <Card sx={{
                    display: "flex",
                    bgcolor: "#fcca46",
                    width: "50vh",
                    height: "25vh",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <EditCalendarIcon sx={{fontSize:"15vh", color:"whitesmoke"}} />
                    </div>
                    <Card sx={{ alignSelf: 'flex-end', width: '100%', height: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap:"1vh" }}>
                        <Typography>
                            Kreirajte novo predavanje
                        </Typography>
                        <KeyboardTabIcon/>
                    </Card>
            </Card>


            <Card sx={{
                    display: "flex",
                    bgcolor: "#fcca46",
                    width: "50vh",
                    height: "25vh",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <EventIcon sx={{fontSize:"15vh", color:"whitesmoke"}} />
                    </div>
                    <Card sx={{ alignSelf: 'flex-end', width: '100%', height: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap:"1vh" }}>
                        <Typography>
                            Pregled predavanje
                        </Typography>
                        <KeyboardTabIcon/>
                    </Card>
            </Card>
        </Stack>
    </Container>
  )
}

export default Home