import React, { useState, useEffect } from "react";
import MaterialReactTable, { MRT_FullScreenToggleButton, MRT_ToggleGlobalFilterButton, MRT_ToggleFiltersButton } from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import ModalConfirmar from "../ModalConfirmar";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv-fix-source-map';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import "../../styles/PolizasGrupos.css";
import { PolizaServiceUpdate } from "../../api/PolizaService";

const DataTablePoliza = props => {
  //Modal Variables
  const [title, setTitle] = useState();
  const [msj, setMsj] = useState();
  const [showModalConfirmar, setShowModalConfirmar] = useState(false);
  //Edit table variables
  const [values, setValues] = useState();
  const [row, setRow] = useState();

  const handleCloseConfirmar = () => {
    setShowModalConfirmar(false);
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
    headers: props.columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };


  return (
    <>
      <div className="boxTabla">
        <MaterialReactTable
          columns={props.columns}
          data={tableData}
          positionToolbarAlertBanner="bottom"
          editingMode="row"
          enableEditing
          onEditingRowCancel={handleCancelRowEdits}
          onEditingRowSave={handleSaveRowEdits}
          localization={MRT_Localization_ES}
          renderToolbarInternalActions={({ table }) => (
            <>
              <MRT_ToggleGlobalFilterButton table={table} />
              <MRT_ToggleFiltersButton table={table} />
              {(props.export)
                ?
                <Tooltip title="Exportar">
                  <IconButton onClick={() => { handleExportRows(table.getPrePaginationRowModel().rows); }}>
                    <FileDownloadIcon />
                  </IconButton>
                </Tooltip>
                : null}
              <MRT_FullScreenToggleButton table={table} />
            </>
          )}
          renderBottomToolbarCustomActions={({ table }) => (
            <div style={{ display: 'flex', gap: '0.5rem' }}>

              <Button
                variant="contained"
                color="primary"
                onClick={() => { handleExportRows(table.getPrePaginationRowModel().rows); }}
              >
                Descargar

              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => { handleExportRows(table.getPrePaginationRowModel().rows); }}
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

    </>
  );
};
export default DataTablePoliza;
