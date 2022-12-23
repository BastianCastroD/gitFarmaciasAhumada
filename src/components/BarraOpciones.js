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
            </div>
        </div>
    );
}

export default BarraOpciones;