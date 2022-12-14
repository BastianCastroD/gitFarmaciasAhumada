/* Importaciones de componentes */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

//import "./api/LoginService";
import Navbar from "./components/Navbar";
import Login from "./screens/Login";
import Home from "./screens/Home";
import OlvidasteContraseña from "./screens/OlvidasteContraseña";
import NuevoPacienteCliente from "./screens/NuevoPacienteCliente";
import AdministrarUsuarios from "./screens/AdministrarUsuarios";
import NuevoClienteEmpresa from "./screens/NuevoClienteEmpresa";
import CambiarPass from "./screens/CambiarPass";
import HomeEmpresa from "./screens/HomeEmpresa";
import ModificarPass from "./screens/ModificarPass";
import PolizasGrupos from "./screens/PolizasGrupos";
import RestaurarPass from "./screens/RestaurarPass";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Home/:email" element={<Home />} />
        <Route exact path="/HomeEmpresa/:email" element={<HomeEmpresa />} />
        <Route exact path="/OlvidasteContraseña" element={<OlvidasteContraseña />} />
        <Route exact path="/NuevoPacienteCliente" element={<NuevoPacienteCliente />} />
        <Route exact path="/AdministrarUsuarios" element={<AdministrarUsuarios />} />
        <Route exact path="/NuevoClienteEmpresa" element={<NuevoClienteEmpresa />} />
        <Route exact path="/CambiarPass" element={<CambiarPass />} />
        <Route exact path="/PolizasGrupos" element={<PolizasGrupos />} />
        <Route exact path="/RestaurarPass/:email" element={<RestaurarPass />} />
        <Route exact path="/ModificarPass/:email" element={<ModificarPass />} />
      </Routes>
    </BrowserRouter>
  );
}