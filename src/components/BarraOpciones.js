import React from "react";
import "../styles/BarraOpciones.css";
import { NavLink } from "react-router-dom";

const BarraOpciones = () => {
    return (  
        <div className="Barra">
            <div className="contenedorOpciones">
                <NavLink to="/AdministrarUsuarios" className="opcion" >Administrar Usuarios</NavLink>
                <NavLink to="/PolizasGrupos" className="opcion" >Polizas y Grupos</NavLink>
            </div>
        </div>
    );
}
 
export default BarraOpciones;