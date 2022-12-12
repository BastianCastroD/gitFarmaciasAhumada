import React, { useState, useEffect } from "react";
import "../styles/PolizasGrupos.css";
import { ContenedorTitulo } from "./Formularios";
import { PolizaService } from "../api/PolizaService";
import DataTableEditAndExport from "./DataTable/DataTablePoliza";
import UploadFile from "./UploadFile/UploadFile";

const FormPolizas = () => {

    // 1.-Configurar Hooks
    const [dataTable, setDataTable] = useState()

    // 2.-Funcion para mostrar los datos
    const showData = async () => {
        const response = await PolizaService()
        setDataTable(response.response)
    }

    useEffect(() => {
        showData()
    }, [])

    const columns = [
        {
            accessorKey: 'codigoPoliza',
            header: 'Codigo',
            size: 20,
        },
        {
            accessorKey: 'estadoPolizaAhumada',
            header: 'Estado',
            size: 100,
        },
        {
            accessorKey: 'grupoAhumada',
            header: 'Grupo',
            enableEditing: false,
            size: 100,
        },
        {
            accessorKey: 'nombrePoliza',
            header: 'Nombre',
            size: 200,
        },
        {
            accessorKey: 'polizaAceptaBioequivalente',
            header: 'Bioequivalente',
            size: 10,

        },
        {
            accessorKey: 'rutEmpresa',
            header: 'RUT',
            size: 120,
        },
        {
            accessorKey: 'terminoBeneficio',
            header: 'Termino Beneficio',
            size: 120,
        },
        {
            accessorKey: 'cuentaLiquidador',
            header: 'Cuenta Liquidador',
            enableEditing: false,
            size: 120,
        },
    ];

    return (
        <main>
            <div>
                <ContenedorTitulo>
                    <label className="titulo">Visualización Póliza y Grupos</label>
                </ContenedorTitulo>
                <div id="notaLogin">
                    En esta seccion podras editar, descargar y cargar masivamente.
                </div>
                {
                    (dataTable === undefined)
                        ?
                        null
                        : <DataTableEditAndExport
                            data={dataTable}
                            columns={columns}
                            export={true}
                        />
                }

            </div>
        </main>
    );
}

export default FormPolizas;