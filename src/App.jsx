import './App.css'
import {Provider} from "react-redux";
import store from "./redux/store.js";
import {Base} from "./Pages/Base.jsx";
import {ScopedCssBaseline} from "@mui/material";

function App() {

  return (
    <Provider store={store}>
        <ScopedCssBaseline >
      <Base />
            </ScopedCssBaseline>
    </Provider>
  )
}

export default App
