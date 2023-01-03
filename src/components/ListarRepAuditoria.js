import React, { useState } from "react";
import "../styles/PolizasGrupos.css";
import { ContenedorTitulo, Titulo } from "./Formularios";
import { PolizaService } from "../api/PolizaService";
import DataTableEditAndExport from "./DataTable/DataTablePoliza";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const FormPolizas = () => {
  const [filtrarValue, setFiltrarValue] = useState()
  const [value, setValue] = useState(null);
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
  //Variables de selects accion y servicio
  const [servicio, setServicio] = React.useState([]);
  const [servicioSelected, setServicioSelected] = useState();
  const [isServicioDisabled, setIsServicioDisabled] = useState(true);
  const [accion, setAccion] = useState('');

  const eliminar = [
    {
      value: 10,
      label: 'Eliminar Rut Lista Medicos',
    },
    {
      value: 20,
      label: 'Eliminar Usuario',
    },
  ];

  const actualizar = [
    {
      value: 10,
      label: 'Actualizar Password',
    },
    {
      value: 20,
      label: 'Actualizar Convenio',
    },
    {
      value: 30,
      label: 'Actualizar Lista Medicos',
    },
    {
      value: 40,
      label: 'Actualizar Empresa',
    },
    {
      value: 50,
      label: 'Actualizar Lista Medicos',
    },
    {
      value: 60,
      label: 'Actualizar Paciente',
    },
    {
      value: 70,
      label: 'Actualizar Poliza',
    },
    {
      value: 80,
      label: 'Actualizar Paciente',
    },
  ];

  const crear = [
    {
      value: 10,
      label: 'Ten',
    },
    {
      value: 20,
      label: 'Twenty',
    },
    {
      value: 30,
      label: 'Thirty',
    },
  ];

  const handleChangeAccion = (event) => {
    var value = event.target.value;
    if (value === 1) {
      setServicio(crear);
      setIsServicioDisabled(false)
    } else if (value === 2) {
      setServicio(actualizar);
      setIsServicioDisabled(false)
    } else if (value === 3) {
      setServicio(eliminar);
      setIsServicioDisabled(false)
    }
  };


  const handleChangeServicio = (event) => {
    setServicioSelected(event.target.value);
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

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={3}>

                <FormControl fullWidth >
                  <InputLabel id="demo-simple-select-label">Accion</InputLabel>
                  <Select
                    labelId="accion-label"
                    id="accion-id"
                    label="Accion"
                    onChange={handleChangeAccion}
                  >
                    <MenuItem value={1}>Crear</MenuItem>
                    <MenuItem value={2}>Actualizar</MenuItem>
                    <MenuItem value={3}>Eliminar</MenuItem>
                  </Select>
                </FormControl>

              </Grid>
              <Grid xs={3}>

                <FormControl fullWidth disabled={isServicioDisabled}>
                  <InputLabel id="demo-simple-select-label">Servicio</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={servicioSelected}
                    onChange={handleChangeServicio}
                  >
                    {servicio.map((servicio) => (
                      <MenuItem key={servicio.value} value={servicio.value}>
                        {servicio.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    label="Basic example"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid xs={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs} size="small">
                  <DatePicker
                    label="Basic example"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid xs={2}>
                <Button variant="contained" onClick={showData} style={{ marginTop: 5 }}>
                  Filtrar
                </Button>
              </Grid>
            </Grid>
          </Box>
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