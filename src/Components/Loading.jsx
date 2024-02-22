import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

const Loading = () => {
    return (
        <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.2)', zIndex: 999 }}>
            <CircularProgress />
        </Box>
    );
};

export default Loading;