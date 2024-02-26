import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "./Login.jsx";
import Home from "./Home.jsx";
import { Stack } from "@mui/system";
import Sidebar from "../Components/Sidebar.jsx";
import { selectUser } from "../redux/reducers/userSlice.js";
import { useEffect, useState } from "react";
import PredmetForm from "../Components/PredmetForm.jsx";
import PregledPredmeta from "./PregledPredmeta.jsx";
import PregledKorisnika from "./PregledKorisnika.jsx";
import { finishLoading, startLoading } from "../redux/reducers/loadingSlice.js";
import PregledPredavanja from "./PregledPredavanja.jsx";
import DodavanjeKorisnikaNaPredmet from "../Components/DodavanjeKorisnikaNaPredmet.jsx";
import ProfesorHome from "./ProfesorPages/ProfesorHome.jsx";
import ProfesorPredmet from "./ProfesorPages/ProfesorPredmet.jsx";



function Layout() {
    return (
        <Stack direction={"row"}>
            <Sidebar />
            <Outlet />
        </Stack>
    )
}


export function Base() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    return (



        <BrowserRouter>
            <Routes>
                {!user.isLoggedIn && <Route path={"/*"} element={<Login />} />}
                {!user.isLoggedIn
                    ? <Route path={"/login"} element={<Login />} />
                    :
                    <Route path="/" element={<Layout />} >
                        <Route path={"/"} element={<Home />} />
                        <Route path={"/predmeti"} element={<PregledPredmeta />} />
                        <Route path={"/predmeti/dodavanjeKorisnika"} element={<DodavanjeKorisnikaNaPredmet />} />
                        <Route path={"/korisnici"} element={<PregledKorisnika />} />
                        <Route path={"/predavanja"} element={<PregledPredavanja />} />
                        <Route path={"/profile"} element={<h1>Profile</h1>} />
                        <Route path={"/profesor"} element={<ProfesorHome />} />
                        <Route path={"/profesor/predmet"} element={<ProfesorPredmet />} />
                        <Route path={"/*"} element={<Navigate to={"/"} />} />
                    </Route>
                }
            </Routes>
        </BrowserRouter >
    )
}
