import { Card, Container, Stack } from "@mui/material"
import { yellow } from "@mui/material/colors"

function Home() {
  return (
    < Container sx={{
        bgcolor:"black",
        height:"100vh",
        width:"100%", 
    }}>
        <Stack direction={"row"} padding={"10vh 0 0 0"} gap={25} sx={{
            width:"100%",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <Card sx={
                {
                    bgcolor:"yellow",
                    width:"50vh",
                    height:"25vh"

                }
            }>
                Lijevi
            </Card>
            <Card sx={{
                bgcolor:"green",
                width:"50vh",
                height:"25vh"

            }}>
                Desni
            </Card>
        </Stack>
        <Stack direction={"row"} padding={"10vh 0 0 0"} gap={25} sx={{
            width:"100%",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <Card sx={
                {
                    bgcolor:"yellow",
                    width:"50vh",
                    height:"25vh"

                }
            }>
                Lijevi
            </Card>
            <Card sx={{
                bgcolor:"green",
                width:"50vh",
                height:"25vh"

            }}>
                Desni
            </Card>
        </Stack>
    </Container>
  )
}

export default Home