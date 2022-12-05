import React from "react";
import { GrupoInput, InputB, Inputs, Inputu, Label } from "./Formularios";
import "../styles/PolizasGrupos.css";

const FormPolizas = () => {
    return (  
        <main>
            <div>
                <div className="boxBuscador">
                    <Label  htmlFor="">Convenio </Label>
                    <GrupoInput>
                        <Inputu
                            type="text"
                            name="convenio"
                            required
                        />
                    </GrupoInput>
                    <Label  htmlFor="">Grupos</Label>
                    <GrupoInput>
                        <Inputu
                            type="text"
                            name="grupo"
                            required
                        />
                    </GrupoInput>
                    <Label  htmlFor="">Polizas</Label>
                    <GrupoInput>
                        <Inputu
                            type="text"
                            name="poliza"
                            required
                        />
                    </GrupoInput>
                </div>
                <div className="boxTabla">
                    <h1>Tabla de grupos y convenios</h1>
                </div>
                <div className="boxBotones">
                    <div className="cargar">
                        <button type="submit" className="buttonCargar">Cargar</button>
                    </div>
                    <div className="descargar">
                        <button type="submit" className="buttonDescargar">Descargar</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
 
export default FormPolizas;