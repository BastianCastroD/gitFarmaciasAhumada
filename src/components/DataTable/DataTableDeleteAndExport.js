import React, { useState, useEffect, useCallback } from "react";

import MaterialReactTable, {

  MRT_FullScreenToggleButton, MRT_ToggleGlobalFilterButton, MRT_ToggleFiltersButton
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';

import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv-fix-source-map';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

const DataTableDeleteAndExport = props => {
  //Se crea la vairable con informacion de la data table
  const [tableData, setTableData] = useState(props.data)

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

  // Metodo para exportar
  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };
  // Metodo para eliminar
  const handleDeleteRow = useCallback(
    (row) => {
      //Enviar una solicitud de eliminación de api aquí, luego recupere o actualice los datos de la tabla local para volver a renderizar
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData],
  );

  return (
    <MaterialReactTable
      columns={props.columns}
      data={tableData}
      positionToolbarAlertBanner="bottom"
      enableRowActions
      localization={MRT_Localization_ES}
      renderRowActions={({ row, table }) => (
        <Box>
          {
            (props.delete)
              ?
              <Tooltip title="Eliminar">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
              :
              null
          }
        </Box>
      )}

      renderToolbarInternalActions={({ table }) => (
        <>
          <MRT_ToggleGlobalFilterButton table={table} />
          <MRT_ToggleFiltersButton table={table} />
          {
            (props.export)
              ?
              <Tooltip title="Exportar">
                <IconButton onClick={() => { handleExportRows(table.getPrePaginationRowModel().rows) }}>
                  <FileDownloadIcon />
                </IconButton>
              </Tooltip>
              : null
          }
          <MRT_FullScreenToggleButton table={table} />
        </>
      )}
    />
  );
};
export default DataTableDeleteAndExport;
