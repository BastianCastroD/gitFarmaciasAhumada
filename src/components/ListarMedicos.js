import React, { useState, useEffect, useMemo } from "react";
import MaterialReactTable from 'material-react-table';
import { ContenedorTitulo, Titulo } from './Formularios';
import Button from 'react-bootstrap/Button';

//import { MRT_Localization_ES } from 'material-react-table/locales/es';
//import { PolizaServiceUpdate } from "../../api/PolizaService";
import ModalUploadFile from "./Modals/ModalUploadFile";
import * as XLSX from 'xlsx/xlsx.mjs';

const data = [

  {
    name: {
      firstName: '',
      lastName: '',
    },
    address: '  ',
    city: ' ',
    state: '',
  },

  {
    name: {
      firstName: '',
      lastName: '',
    },
    address: ' ',
    city: '',
    state: '',
  },

  {
    name: {
      firstName: '',
      lastName: '',
    },
    address: '  ',
    city: ' ',
    state: ' ',
  },

  {
    name: {
      firstName: '',
      lastName: '',
    },
    address: '',
    city: '',
    state: '',
  },

  {
    name: {
      firstName: '',
      lastName: '',
    },
    address: '',
    city: '',
    state: '',
  },

];

const ListarMedicos = props => {

  //Modal Variables
  //const [title, setTitle] = useState();
  //const [msj, setMsj] = useState();
  //Modal Alert
  const [titleAlert, setTitleAlert] = useState();
  const [msjAlert, setMsjAlert] = useState();
  const [showModalAlert, setShowModalAlert] = useState(false);
  //Modal Upload File
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showModalConfirmar, setShowModalConfirmar] = useState(false);

  const handleCloseConfirmar = () => {
    setShowModalConfirmar(false);
  }

  const handleCloseUpload = () => {
    setShowModalUpload(false);
  }

  const handleCloseAlert = () => {
    setShowModalAlert(false);
  }

  const columns = useMemo(

    () => [
      {
        accessorKey: 'name.firstName',
        header: 'Rut Medico',
      },
      {
        accessorKey: 'name.lastName',
        header: 'Fecha RP Original',
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Inclusión / Exclusión',
      }
    ],
    [],
  );

  return (
    <>
      <div className="boxTabla">
        <ContenedorTitulo>
          <Titulo>Visualizacion de Medicos</Titulo>
        </ContenedorTitulo>
        <div id="notaLogin">
          En esta sección se muestran todos los medicos asociados a un convenio.
        </div>
        <MaterialReactTable columns={columns} data={data}
          renderBottomToolbarCustomActions={({ table }) => (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                onClick={() => { setShowModalUpload(true) }}
              >
                Cargar
              </Button>
            </div>

          )}
        />
        <ModalUploadFile
          title={"Cargar datos masivos"}
          msj={"Cargue el archivo .xlsx con el cual desea actualizar los registros"}
          show={showModalUpload}
          handleClose={handleCloseUpload}
        />
      </div>
    </>
  );
};
export default ListarMedicos;