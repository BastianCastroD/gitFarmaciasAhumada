import React from "react";
import "../styles/BarraOpciones.css";
import { NavLink } from "react-router-dom";

const BarraOpciones = (user) => {
    const usuario = (JSON.parse(user.user));
    return (
        <div className="Barra">

            <div className="contenedorOpciones">
                {
                    (usuario.rol === "Empresa")
                        ?
                        <NavLink to="/AdministrarUsuarios" className="opcion" >Administrar Usuarios</NavLink>
                        : null
                }

                <NavLink to="/PolizasGrupos" className="opcion" >Polizas y Grupos</NavLink>
                <NavLink to="/Beneficiarios" className="opcion" >Beneficiarios</NavLink>
                <NavLink to="/CartolaVentas" className="opcion" >Cartola Ventas</NavLink>
                <NavLink to="/AutorizacionesPrevias" className="opcion" >Autoriz. Previas</NavLink>
                <NavLink to="/Medicos" className="opcion" >Medicos</NavLink>
                <NavLink to="/Documentos" className="opcion" >Documentos</NavLink>
                <a href="https://www.farmaciasahumada.cl/storelocator" className="opcion">Consultar Farmacias</a>
                <a href="https://web.farmaciasahumada.cl/fasaonline/fasa/MFT/MFT.HTM" className="opcion">Consultar Medicamentos</a>
                <NavLink to="/ReporteAuditoria" className="opcion" >Reporte Auditoria</NavLink>
            </div>
        </div>
    );
}

export default BarraOpciones;