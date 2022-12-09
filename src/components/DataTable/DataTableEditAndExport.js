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

const DataTableEditAndExport = props => {
  //
  const [title, setTitle] = useState();
  const [msj, setMsj] = useState();
  const [showModalConfirmar, setShowModalConfirmar] = useState(false);

  const handleCloseConfirmar = () => {
    setShowModalConfirmar(false);
  }

  const handleYes = async () => {
    //const resp = await EliminarUsuario(idElminar)

    setShowModalConfirmar(false);


  }


  //Se crea la vairable con informacion de la data table
  const [tableData, setTableData] = useState(() => props.data)

  //Ingresar la informacion a la variable table apenas se incia el modulo
  useEffect(() => {
    setTableData(props.data);
  }, [])

  //Metodo para handle la edicion de informacion de la table
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    tableData[row.index] = values;
    //send/receive api updates here, then refetch or update local table data for re-render
    console.log(values);
    setTableData([...tableData]);
    exitEditingMode(); //required to exit editing mode and close modal
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
        handleYes={handleYes}
      />

    </>
  );
};
export default DataTableEditAndExport;
