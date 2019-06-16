/*
* @Autor: Jose Alcivar
* @FechaCreacion: 16/03/2018
*/
'use strict';

const sequelize	  = require('../models/').sequelize;
const modeloRol = require('../models').Rol;
let status = require('../response/status');
let errors = require('../response/error');

/**
 * @description funcion para obtener los clientes que pertenecen a un vendedor
 * @param {*} req 
 * @param {*} res 
 */
const GetRoles = async (req, res) => {

  
  try{
    const roles = await modeloRol.findAll({});
        return status.okGet(res, 'Busqueda cliente exitosa', roles);
  }catch(fail){
      return status.error(res, 'No se obtuvieron registros', '', fail);
    }
};


const createRoles = async (req,res) => {
     
  const dataRol = {
      nombre         : req.body.nombre.toUpperCase(),
      nivel: req.body.nivel,
      EmpresaId:req.body.EmpresaId,
      estado: true,
      
  };
  
  //let repeat = await modeloEmpresa.verifyRepeatCompany(dataCompany);
  //if(repeat.length>0) return status.ERROR_ALLREADYEXIST(res,'Este registro ya existe');
  const t = await inicializarTransaccion();
  
  try{
     const roles = await modeloRol.createRol(dataRol, t);
     
     t.commit();
     
     return status.okCreate(res,'create Successfull', roles);
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
    GetRoles, createRoles
}