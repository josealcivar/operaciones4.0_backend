/*
* @Autor: Jose Alcivar
* @FechaCreacion: 16/03/2018
*/
'use strict';

const sequelize	  = require('../models/').sequelize;
const modeloDepartament = require('../models').Departamento;
let status = require('../response/status');
let errors = require('../response/error');

/**
 * @description funcion para obtener los clientes que pertenecen a un vendedor
 * @param {*} req 
 * @param {*} res 
 */
const GetDepartamentos = async (req, res) => {

  
  try{
    const departamentos = await modeloDepartament.findAll({});
        return status.okGet(res, 'Busqueda cliente exitosa', departamentos);
  }catch(fail){
      return status.error(res, 'No se obtuvieron registros', '', fail);
    }
};


const createDepartamento = async (req,res) => {
     
  const dataDepartamento = {
      nombre         : req.body.nombre.toUpperCase(),
      codigoDepartamento         : req.body.codigoDepartamento, 
      latitud                     : req.body.latitud,  
      longitud       : req.body.longitud,
      telefono : req.body.telefono,
      EmpresaId: req.body.EmpresaId,
      estado: true,
      
  };
  console.log(dataDepartamento);
  //let repeat = await modeloEmpresa.verifyRepeatCompany(dataCompany);
  //if(repeat.length>0) return status.ERROR_ALLREADYEXIST(res,'Este registro ya existe');
  const t = await inicializarTransaccion();
  
  try{
     const departamento = await modeloDepartament.createDepartment(dataDepartamento, t);
     
     t.commit();
     
     return status.okCreate(res,'create Successfull', departamento);
  }catch(fail){
      t.rollback();
      return status.ERROR_SERVIDOR(res, fail);
  }
  
};



function inicializarTransaccion(){
	return new Promise( (resolve, reject) => {
		sequelize.transaction(
      {
        autocommit: false
      }
    )
		.then( result => {
			return resolve(result);
		})
		.catch( fail => {
			return reject(fail);
		});
	});
};

module.exports = {
    GetDepartamentos, createDepartamento
}