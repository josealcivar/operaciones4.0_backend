module.exports.okCreate = (res, mensaje, datos) => {
	return res.status(201).json({
		estado: true,
		mensaje: mensaje,
		datos: datos
	});
};

module.exports.error = (res, mensaje, mensajeError, datos) => {
	return res.status(400).json({
		estado: false,
		mensaje: mensaje,
		mensajeError: mensajeError,
		datos: datos
	});
};

module.exports.okGet = (res, mensaje, datos) => {
	return res.status(200).json({
		estado: true,
		mensaje: mensaje,
		datos: datos
	});
};

module.exports.okDelete = (res, mensaje, datos) => {
	return res.status(200).json({
		estado: true,
		mensaje: mensaje
	});
};

module.exports.errorDelete = (res, mensaje, datos) => {
	return res.status(400).json({
		estado: false,
		mensajeError: mensaje
	});
};

module.exports.okUpdate = (res, mensaje, datos) => {
	return res.status(200).json({
		estado: true,
		mensaje: mensaje,
		datos: datos
	});
};

module.exports.errorUpdate = (res, mensaje, error) => {
	return res.status(400).json({
		estado: true,
		mensaje: mensaje,
		error: error
	});
};



/*
	Responde con un estado 403 de acceso restringido
*/
module.exports.apiAuthError = (res, mensaje) => {
	return res.status(403).json({
		estado : false,
		mensaje : mensaje
	});
};

module.exports.authUnauthorizedError = (res, mensaje) => {
	return res.status(401).json({
		estado : false,
		mensaje : mensaje
	});
};

module.exports.errorNotFound = (res, mensaje) => {
	return res.status(404).json({
		estado: false,
		mensaje: mensaje
	});
};

/*
	Redirige a la ventana de error
*/
module.exports.viewsUnauthorized = (res) => {
	res.status(403);
	return res.render('error/noAutorizado');
};

module.exports.ERROR_SERVIDOR = (res, error) => {
	return res.status(500).json({
		estado  : false,
		mensaje : 'Error en el servidor',
		error   : error
	});
};

module.exports.ERROR_ALLREADYEXIST = (res, error) => {
	return res.status(302).json({
		estado  : false,
		mensaje : 'Error de datos',
		error   : error
	});
}; 