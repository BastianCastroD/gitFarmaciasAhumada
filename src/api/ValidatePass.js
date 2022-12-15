const axios = require('axios');

export const ValidatePass = async (data) => {
	const config = {
		method: 'post',
		url: 'http://localhost:8181/cxf/validatepass/services/validatepass',
		headers: {
			'Content-Type': 'application/json',
			passwd: data,
		},
	};
	const response = axios(config)
		.then(({ data: outActualizar }) => {
			return outActualizar;
		})
		.catch((error) => {
			console.log(error.response.data)
			return error.response.data;
		});

	return response;
}