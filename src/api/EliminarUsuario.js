const axios = require('axios');

export const EliminarUsuario = async (data) => {
    
    const config = {
        method: 'post',
        url: 'http://localhost:8181/cxf/convenios1/services/eliminarConvenio',
        headers: {
            'Content-Type': 'application/json',
            id: data,
        },
    };

    const response = axios(config)
        .then(({ data: outEliminar }) => {

            return outEliminar;
        })
        .catch((error) => {
            return error;
        });

    return response;
}