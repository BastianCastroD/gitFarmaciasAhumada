import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContenedorTitulo, InputB } from "./Formularios";
import { EliminarUsuario } from "../api/EliminarUsuario";

import DataTableDeleteAndExport from "./DataTable/DataTableDeleteAndExport";
import styled from 'styled-components';
// import Modal from "./Modal";
// import ModalAlertConfirmar from "./ModalAlert/indexConfirmar";
// import ModalAlert from './ModalAlert';
import "../styles/AdminUsuarios.css";
import ModalTest from "./ModalTest";
import ModalConfirmar from "./ModalConfirmar";
import { ListarUsuarios } from "../api/ListarUsuarios";


const FormAdminUsuarios = () => {
    const [title, setTitle] = useState();
    const [msj, setMsj] = useState();
    const [showModalConfirmar, setShowModalConfirmar] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const history = useNavigate();
    const [idElminar, setIdElminar] = useState("");
    const handleCloseConfirmar = () => {
        setShowModalConfirmar(false);
    }
    const handleClose = () => {
        setShowModal(false);
    }

    const handleYes = async () => {
        const resp = await EliminarUsuario(idElminar)
        var codigoRespuesta = resp['eliminar'][0]['codigoRespuesta'];
        var detalleRespuesta = resp['eliminar'][0]['detalleRespuesta'];
        setShowModalConfirmar(false);
        setTitle("Eliminar usuario existente")
        setShowModal(true)
        setMsj(detalleRespuesta)
        if (codigoRespuesta == 0) {
            setIdElminar("");
        }
    }

    const onSubmit = async (e) => {
        history("/NuevoClienteEmpresa");
    };

    //Llamada a la api para eliminar usuario.
    const onSubmitEliminar = async (e) => {
        e.preventDefault();
        setShowModalConfirmar(true)
        setTitle("Eliminar usuario existente")
        setMsj("¿Desea eliminar el usuario seleccionado?")
    };


    // DataTable
    // 1.-Configurar Hooks
    const [users, setUsers] = useState()


    // 2.-Funcion para mostrar los datos
    const showData = async () => {
        const response = await ListarUsuarios()

        setUsers(response.usuario)

    }

    useEffect(() => {
        showData()
    }, [])

    // 3.-Configurar columnas para Datatable
    const columns = [
        {
            accessorKey: 'nombre',
            header: 'nombre',
            size: 40,
        },
        {
            accessorKey: 'apellido',
            header: 'First Name',
            size: 120,
        },
        {
            accessorKey: 'apellido2',
            header: 'Last Name',
            size: 120,
        },
    ];

    const clickhandler = name => console.log("delete", name);

    return (
        <main>
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <ContenedorTitulo>
                            <label className="titulo">Agregar un nuevo Cliente Empresa</label>
                        </ContenedorTitulo>
                        <div id="notaLogin">
                            En esta seccion podras agregar un nuevo usuario al sistema.
                        </div>
                        <div>
                            <button className="buttonAgregarUsuario" onClick={onSubmit}> + Agregar Usuario</button>
                        </div>
                        <div className="boxTabla">
                            {
                                (users === undefined)
                                    ?
                                    null
                                    : <DataTableDeleteAndExport
                                        data={users}
                                        columns={columns}
                                        export={false}
                                        delete={true}
                                    />
                            }

                        </div>
                    </div>
                </div>
            </div>
            <ModalConfirmar
                title={title}
                msj={msj}
                show={showModalConfirmar}
                handleClose={handleCloseConfirmar}
                handleYes={handleYes}
            />
            <ModalTest title={title} show={showModal} handleClose={handleClose} msj={msj} />
        </main>
    );
}

export default FormAdminUsuarios;