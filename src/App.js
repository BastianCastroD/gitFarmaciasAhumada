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
import PolizasGrupos from "./screens/PolizasGrupos";
import ModificarPass from "./screens/ModificarPass";
import RestaurarPass from "./screens/RestaurarPass";
import PrivateRoutes from './utils/PrivateRoutes';
import PacienteRoutes from './utils/PacienteRoutes';
import EmpresaRoutes from './utils/EmpresaRoutes';

export default function App() {
  const user = localStorage.getItem("user");
  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>

        <Route exact path="/" element={<Login />} />
        <Route exact path="/OlvidasteContraseña" element={<OlvidasteContraseña />} />
        <Route exact path="/NuevoPacienteCliente" element={<NuevoPacienteCliente />} />

        <Route element={<PacienteRoutes />}>

        </Route>

        <Route element={<EmpresaRoutes />}>
          <Route exact path="/HomeEmpresa/:email" element={<HomeEmpresa />} />
          <Route exact path="/AdministrarUsuarios" element={<AdministrarUsuarios />} />
          <Route exact path="/NuevoClienteEmpresa" element={<NuevoClienteEmpresa />} />
          <Route exact path="/PolizasGrupos" element={<PolizasGrupos />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route exact path="/RestaurarPass" element={<RestaurarPass />} />
          <Route exact path="/ModificarPass" element={<ModificarPass />} />
          <Route exact path="/Home" element={<Home />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}