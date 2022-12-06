import React, { useState, useEffect, onChange } from "react";
import "../styles/PolizasGrupos.css";
import DataTable from "react-data-table-component";
import { ListarUsuarios } from "../api/ListarUsuarios";

const FormPolizas = () => {

    // 1.-Configurar Hooks
    const [users, setUsers] = useState([ ])


    // 2.-Funcion para mostrar los datos
    const showData = async () => {
        const response = await ListarUsuarios()
        const data = await response
        //console.log(users)
        //setUsers(response)
        //setUsers(data)
    }

    useEffect( () => {
        showData()
    }, [])

    // 3.-Configurar columnas para Datatable
    const columns = [
        {
            name: 'Nombre',
            selector: row => row.nombre
        },
        {
            name: 'Apellido',
            selector: row => row.apellido
        },
        {
            name: 'Apellido2',
            selector: row => row.apellido2
        }
    ]

    return (  
        <main>
            <div>
                <div className="boxTabla">
                    <DataTable 
                        title="Visualizacion de polizas y grupos"
                        columns={columns}
                        data={users}
                        pagination
                    />
                </div>
                <div className="boxBotones">
                    <div className="cargar">
                        <button type="submit" className="buttonCargar">Cargar</button>
                    </div>
                    <div className="descargar">
                        <button type="submit" className="buttonDescargar">Descargar</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
 
export default FormPolizas;