import React, { useState, useEffect } from "react";
import MaterialReactTable, { MRT_FullScreenToggleButton, MRT_ToggleGlobalFilterButton, MRT_ToggleFiltersButton } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import Button from 'react-bootstrap/Button';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import ModalConfirmar from "../ModalConfirmar";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv-fix-source-map';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import "../../styles/PolizasGrupos.css";
import { PolizaServiceUpdate } from "../../api/PolizaService";
import ModalUploadFile from "../ModalUploadFile/ModalUploadFile";
import * as XLSX from 'xlsx/xlsx.mjs';


const DataTablePoliza = props => {
  //Modal Variables
  const [title, setTitle] = useState();
  const [msj, setMsj] = useState();
  const [showModalConfirmar, setShowModalConfirmar] = useState(false);
  //Modal Upload Variables
  const [titleUpload, setTitleUpload] = useState();
  const [msjUpload, setMsjUpload] = useState();
  const [showModalUpload, setShowModalUpload] = useState(false);
  //Edit table variables
  const [values, setValues] = useState();
  const [row, setRow] = useState();

  const handleCloseConfirmar = () => {
    setShowModalConfirmar(false);
  }

  const handleCloseUpload = () => {
    setShowModalUpload(false);
  }
  //Confirma la accion del modal y ejecuta update de la informacion de la tabla 
  const handleConfirmar = async () => {
    const resp = await PolizaServiceUpdate(
      values.grupoAhumada,
      values.nombrePoliza,
      values.codigoPoliza,
      values.rutEmpresa,
      values.terminoBeneficio,
      values.polizaAceptaBioequivalente
    )
    console.log(resp);
    setShowModalConfirmar(false);
    tableData[row.index] = values;
    setTableData([...tableData]);

  }
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
      header: 'Grupo*',
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
      header: 'Cuenta Liquidador*',
      enableEditing: false,
      size: 120,
    },
  ];
  //Se crea la vairable con informacion de la data table
  const [tableData, setTableData] = useState(() => props.data)

  //Ingresar la informacion a la variable table apenas se incia el modulo
  useEffect(() => {
    setTableData(props.data);
  }, [])

  //Metodo para handle la edicion de informacion de la table
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    setTitle("¿Desea continuar?")
    setMsj("Seleccione confirmar si desea editar el campo")
    setShowModalConfirmar(true)
    setValues(values);
    setRow(row);
    exitEditingMode();
  };

  //Metodo para handle la cancelacion de la edicion de informacion de la table
  const handleCancelRowEdits = () => {
    console.log('a');
  };

  //Opciones de la creacion de csv
  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const downloadExcel = (rows) => {
    const newData = rows.map(row => {
      return getRows(row);
    })
    const workSheet = XLSX.utils.json_to_sheet(newData)
    const workBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook, workSheet, "polizas")
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    //Download
    XLSX.writeFile(workBook, "Polizas.xlsx")
  }


  const getRows = (row) => {
    delete row.tableData
    if (row.original.codigoPoliza === undefined) {
      row.original.codigoPoliza = " ";
    }
    if (row.original.estadoPolizaAhumada === undefined) {
      row.original.estadoPolizaAhumada = " ";

    }
    if (row.original.grupoAhumada === undefined) {
      row.original.grupoAhumada = " ";

    }
    if (row.original.nombrePoliza === undefined) {
      row.original.nombrePoliza = " ";

    }
    if (row.original.polizaAceptaBioequivalente === undefined) {
      row.original.polizaAceptaBioequivalente = " ";

    }
    if (row.original.rutEmpresa === undefined) {
      row.original.rutEmpresa = " ";

    }
    if (row.original.terminoBeneficio === undefined) {
      row.original.terminoBeneficio = " ";

    }
    if (row.original.cuentaLiquidador === undefined) {
      row.original.cuentaLiquidador = " ";
    }
    return row.original;
  };



  const csvExporter = new ExportToCsv(csvOptions);



  return (
    <>
      <div className="boxTabla">
        <MaterialReactTable
          columns={columns}
          data={tableData}
          positionToolbarAlertBanner="bottom"
          editingMode="row"
          enableEditing
          onEditingRowCancel={handleCancelRowEdits}
          onEditingRowSave={handleSaveRowEdits}
          localization={MRT_Localization_ES}
          renderBottomToolbarCustomActions={({ table }) => (
            <div style={{ display: 'flex', gap: '0.5rem' }}>

              <Button

                onClick={() => { downloadExcel(table.getPrePaginationRowModel().rows) }}
              >
                Descargar

              </Button>
              <Button

                onClick={() => { setShowModalUpload(true) }}
              >
                Cargar
              </Button>
            </div>

          )}
        />
      </div>
      <ModalConfirmar
        title={title}
        msj={msj}
        show={showModalConfirmar}
        handleClose={handleCloseConfirmar}
        handleYes={handleConfirmar}
      />
      <ModalUploadFile
        title={"Cargar datos masivos"}
        msj={"Cargue el archivo .csv con el cual desea actualizar los registros"}
        show={showModalUpload}
        handleClose={handleCloseUpload}
      />

    </>
  );
};
export default DataTablePoliza;
