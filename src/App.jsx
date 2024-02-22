import { useSelector } from 'react-redux';
import './App.css'
import { Base } from "./Pages/Base.jsx";
import { ScopedCssBaseline } from "@mui/material";
import Loading from './Components/Loading.jsx';

function App() {
  const isLoading = useSelector(state => state.loading.isLoading)

  return (
    <ScopedCssBaseline >
      {isLoading && <Loading />}
      {
        <Base />
      }
    </ScopedCssBaseline>
  )
}

export default App
