import React, { useState } from "react";
import "../styles/PolizasGrupos.css";
import { ContenedorTitulo, Titulo } from "./Formularios";
import { PolizaService } from "../api/PolizaService";
import DataTableEditAndExport from "./DataTable/DataTablePoliza";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const FormPolizas = () => {
    const [filtrarValue, setFiltrarValue] = useState()


    // 1.-Configurar Hooks
    const [dataTable, setDataTable] = useState()

    // 2.-Funcion para mostrar los datos
    const showData = async () => {
        setDataTable(undefined)
        const response = await PolizaService(filtrarValue)
        setDataTable(response.response)
    }

    const onChange = (e) => {
        console.log(e.target.value);
        setFiltrarValue(e.target.value);

    };

    return (
        <main>
            <div>
                <ContenedorTitulo>
					<Titulo>Visualización de Pólizas y Grupos</Titulo>
				</ContenedorTitulo>
                <div id="notaLogin">
                    En esta seccion podras editar, descargar y cargar masivamente.
                </div>
                <Form>
                    <Row>
                        <Col xs={7}>
                            <Form.Select onChange={onChange} aria-label="Default select example">
                                <option>Seleccionar codigo</option>
                                <option value="EURA">EURA</option>
                                <option value="BCIS">BCIS</option>
                                <option value="EURA">EURA</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Button onClick={showData} style={{ marginTop: 5 }}>
                                Filtrar
                            </Button>
                        </Col>
                    </Row>
                </Form>
                {
                    (dataTable === undefined)
                        ?
                        null
                        : <DataTableEditAndExport
                            data={dataTable}
                        />
                }

            </div>
        </main>
    );
}

export default FormPolizas;