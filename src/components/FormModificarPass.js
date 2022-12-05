import React from "react";
import { Label, GrupoInput, Inputs, LabelReq, Inputp, RestriccionPass} from "./Formularios";

const FormModificarPass = () => {
    return (  
        <main className="mainUnic">
            <form action="">
                <div>
                    <div className="contenedorTitulo">   
                        <label className="titulo">Modificar Contraseña</label>
                    </div>
                    <div className="leyenda">   
                        <label>
                            Para poder modificar su contraseña ingrese la clave anterior
                            y una nueva clave.
                        </label>
                    </div>
                    <GrupoInput>
                        <Label  htmlFor="">Contraseña Actual <LabelReq htmlFor=""> *</LabelReq></Label>
                        <Inputp 
                            type="password"
                            placeholder=""
                            name=""
                            value=""
                            onChange={onchange}
                            min="7"
                            max="20"
                            required 
                            />
                    </GrupoInput>
                    <GrupoInput>
                        <Label  htmlFor="">Nueva Contraseña <LabelReq htmlFor=""> *</LabelReq></Label>
                        <Inputp
                            type="password"
                            placeholder=""
                            name=""
                            value=""
                            onChange={onchange}
                            min="7"
                            max="20"
                            required
                        />
                        <RestriccionPass>
						    La contraseña debe contener desde 7 a 20 caracteres,
							se exige una letra minuscula y una mayuscula, un numero y un caracter especial.
						</RestriccionPass>
                    </GrupoInput>
                    <GrupoInput>
                        <Label  htmlFor="">Confirmar Contraseña <LabelReq htmlFor=""> *</LabelReq></Label>
                        <Inputp
                            type="password"
                            placeholder=""
                            name=""
                            value=""
                            onChange={onchange}
                            min="7"
                            max="20"
                            required 
                        />
                    </GrupoInput>
                    <div className="blockRegistro">
                        <div className="campoRequerido">
                            <span className="obligatorio">* Campos requeridos</span>
                        </div>
                        <div className="blockCrearCuenta">
                            <button className="buttomRestablecerContraseña">Actualizar Contraseña</button>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
}
 
export default FormModificarPass;