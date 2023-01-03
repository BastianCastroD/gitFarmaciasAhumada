const axios = require('axios');

export const PolizaService = async (data) => {

    const config = {
        method: 'get',
        url: 'http://localhost:8181/cxf/buscarpolizas/services/buscarPoliza',
        headers: {
            'codigo': data
        }
    };
    const response = axios(config)
        .then(({ data: out }) => {
            return out;
        })
        .catch((error) => {
            throw new error(error);
        });

    return response;
}
