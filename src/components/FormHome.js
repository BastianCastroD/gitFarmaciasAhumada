import React, { useEffect, useState } from "react";
import { Label, GrupoInput, InputH, ContenedorTitulo, Titulo } from "./Formularios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { HomeService } from "../api/HomeService";
import "../styles/Home.css";
//import { LoginService } from "../api/LoginService";

const FormHome = () => {
	const [initialState, setInitialState] = useState({
		nombre: '',
		rut: '',
		apellido: '',
		apellido2: '',
		email: '',
		celular: '',
	})


	const navigate = useNavigate();
	const location = useLocation();
	const emailparam = location.pathname.split("/")

	const handleClick = () => {
		//Redireccionar al home usuario cliente recien creado
		navigate(`/ModificarPass/${initialState.email}`);
	}

	const home = async (email) => {
		const response = await HomeService(email)
		const datosUsuarios = JSON.parse(response)

		const { rut, nombre, apellido, apellido2, correo, celular } = datosUsuarios.usuario[0];

		setInitialState({
			rut: rut,
			nombre: nombre,
			apellido: apellido,
			apellido2: apellido2,
			email: correo,
			celular
		})
	}

	useEffect(() => {
		home(emailparam[2])
	}, [])

	return (
		<main>
			<div className="container">
				<div className="row">
					<div className="col">
						<GrupoInput>
							<ContenedorTitulo>
								<Titulo>Informacion Personal</Titulo>
							</ContenedorTitulo>
							<GrupoInput>
								<Label className="labelForm" htmlFor="">
									RUT
								</Label>
								<InputH
									className="inputForm"
									value={initialState.rut}
									type="text"
									readOnly
								/>
							</GrupoInput>
							<GrupoInput>
								<Label className="labelForm" htmlFor="">
									Nombre
								</Label>
								<InputH
									className="inputForm"
									type="text"
									value={initialState.nombre}
									readOnly
								/>
							</GrupoInput>
							<GrupoInput>
								<Label className="labelForm" htmlFor="">
									1° Apellido
								</Label>
								<InputH
									className="inputForm"
									type="text"
									value={initialState.apellido}
									readOnly
								/>
							</GrupoInput>
							<GrupoInput>
								<Label className="labelForm" htmlFor="">
									2° Apellido
								</Label>
								<InputH
									className="inputForm"
									type="text"
									value={initialState.apellido2}
									readOnly
								/>
							</GrupoInput>
							<GrupoInput>
								<Label className="labelForm" htmlFor="">
									Numero de Telefono
								</Label>
								<InputH
									className="inputForm"
									type="text"
									value={initialState.celular}
									readOnly
								/>
							</GrupoInput>
							<div>
								<NavLink className="navlink">Editar Informacion</NavLink>
							</div>
						</GrupoInput>{" "}
					</div>
					<div className="col">
						<GrupoInput>
							<ContenedorTitulo>
								<Titulo>Informacion de la Cuenta</Titulo>
							</ContenedorTitulo>
							<GrupoInput>
								<Label className="labelForm" htmlFor="">
									Correo Electronico
								</Label>
								<InputH
									className="inputForm"
									type="text"
									value={initialState.email}
									readOnly
								/>
							</GrupoInput>
							<div id="accionRegistro">
								<div id="botonModificar">
									<button onClick={handleClick} >Modificar Contraseña</button>
								</div>
							</div>
						</GrupoInput>{" "}
					</div>
				</div>
			</div>
		</main>
	);
};

export default FormHome;


// <NavLink to="/ModificarPass/" className="navlink" >Modificar Contraseña</NavLink>
