import React, { useState, useRef, useEffect } from 'react';
import { LoginService } from '../../api/LoginService';
import { useNavigate, } from 'react-router-dom';
import styles from './styles.module.css';
import ReCAPTCHA from "react-google-recaptcha";
import { NavLink } from "react-router-dom";
import "../../styles/Login.css";
import {
	Label,
	LabelReq,
	Inputs,
	GrupoInput,
	Inputp,
	Titulo,
	DivTitulos
} from "../Formularios";

import ModalTest from '../ModalTest';
import { HomeServiceEmpresa } from "../../api/HomeEmpresaService";


const FormLogin = () => {


	useEffect(() => {
		const loggedInUser = localStorage.getItem("user");
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			console.log(foundUser);
		}
	}, []);

	const [showModal, setShowModal] = useState(false);
	const handleClose = () => setShowModal(false);
	const [msj, setMsj] = useState();
	const [title, setTitle] = useState();

	//const handleClose = () => {
	//	setShowModal(false);
	//}
	const [btnValid, setBtnValid] = useState(false);

	const navigate = useNavigate();

	const captcha = useRef(null);

	const validCaptcha = () => {
		if (captcha.current.getValue().length > 0) {
			setBtnValid(true)
		}
		else {
			setBtnValid(false)
		}
	}

	const [registerData, setRegisterData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = registerData;

	const onchange = (event) => {
		setRegisterData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	// Validaciones del Login
	const onSubmit = async (e) => {
		e.preventDefault();

		const resp = await LoginService(registerData);
		const r = JSON.parse(resp);

		// Condicional segun el codigo de respuesta (0=ok - 1=No Existe - 2=Usuario Invalido - 3=Pass Expirada)
		if (r.login[0].codigoResultadoLogin === 0) {

			//Llamamos a la api del usuario para obtener sus datos y le agregamos el tipo en la informacion 
			const user = await HomeServiceEmpresa(registerData.email)
			user.usuarioEmpresa[0].rol = r.login[0].tipo
			localStorage.setItem("user", JSON.stringify(user.usuarioEmpresa[0]));
			navigate(`/Home`);


		} else if (r.login[0].codigoResultadoLogin === 1) {
			setShowModal(true)
			setTitle("Error al iniciar sesión")
			setMsj("El usuario ingresado no existe.")
		} else if (r.login[0].codigoResultadoLogin === 2) {
			setShowModal(true)
			setTitle("Error al iniciar sesión")
			setMsj("El usuario ingresado es invalido.")
		} else if (r.login[0].codigoResultadoLogin === 3) {
			setShowModal(true)
			setTitle("Error al iniciar sesión")
			setMsj("La contraseña ingresada se encuentra expirada.")
		}
	};

	return (
		<div className="row align-items-center">
			<div className="col-md-8">
				<div>
					<DivTitulos>
						<Titulo>Usuarios Registrados</Titulo>
					</DivTitulos>
					<div id="notaLogin">
						Si tiene una cuenta, inicie sesión con su dirección de correo
						electrónico.
					</div>
					<form className={styles.form} onSubmit={onSubmit}>
						<GrupoInput>
							<Label>Correo Electronico <LabelReq> *</LabelReq></Label>
							<Inputs
								type="email"
								placeholder=""
								name="email"
								value={email}
								onChange={onchange}
								required
							/>
						</GrupoInput>
						<GrupoInput>
							<Label>Contraseña <LabelReq> *</LabelReq></Label>
							<Inputp
								type="password"
								name="password"
								placeholder=""
								min="7"
								max="20"
								value={password}
								onChange={onchange}
								required
							/>
						</GrupoInput>
						<div className="recaptcha">
							<ReCAPTCHA
								ref={captcha}
								sitekey="6Lek9tsiAAAAAOUyn_NBrROccYIf_-w38fsocNlN"
								onChange={validCaptcha}
							/>
						</div>
						<div className='accionLogin'>
							<div className='botonLogin'>
								{btnValid === !false && (
									<button type="submit">Inicio Sesion</button>
								)}
							</div>
							<div className="olvidasteContraseña">
								<li id="li-contraseña">
									<NavLink to="/OlvidasteContraseña">
										¿Olvidaste tu contraseña?
									</NavLink>
								</li>
							</div>
							<div id="requerido">
								<span>* Campos requeridos</span>
							</div>
						</div>
					</form>
					<ModalTest title={title} show={showModal} handleClose={handleClose} msj={msj} />
				</div>
			</div>
		</div>
	);
};

export default FormLogin