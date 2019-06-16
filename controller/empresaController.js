'use strict';

const sequelize	  = require('../models').sequelize;
const modeloEmpresa = require('../models').Empresa;
const modeloUser = require('../models').Usuario;
let status = require('../response/status');
let errors = require('../response/error');
const modelo = require('../models');


/**
 * @description funcion para crear una persona
 * @author jose alcivar garcia
 */

const createEmpresa = async (req,res) => {
     
    const dataCompany = {
        raonsocial         : req.body.raonsocial,
        nombrecomercial         : req.body.nombrecomercial, 
        ruc                     : req.body.ruc,  
        representantelegal       : req.body.representantelegal,
        telefono : req.body.telefono,
        direccion : req.body.direccion,
        estado: true,
        
    };
    console.log(dataCompany);
    let repeat = await modeloEmpresa.verifyRepeatCompany(dataCompany);
    if(repeat.length>0) return status.ERROR_ALLREADYEXIST(res,'Este registro ya existe');
    const t = await inicializarTransaccion();
    
    try{
       const empresa = await modeloEmpresa.createEmpresa(dataCompany, t);
       
       t.commit();
       
       return status.okCreate(res,'create Successfull', empresa);
    }catch(fail){
        t.rollback();
        return status.ERROR_SERVIDOR(res, fail);
    }
    
};

const getAllEmpresas = async (req, res) =>{
    modeloEmpresa.findAll({
   
  }).then(empresas => {
    console.log(empresas);
    const data = empresas.map(empresa => {

      return Object.assign({}, {
        razonsocial   : empresa.razonsocial,
        nombrecomercial: empresa.nombrecomercial,
        ruc           : empresa.ruc,
        representantelegal  : empresa.representantelegal,
        estado: empresa.estado

      });
    });

    return status.okGet(res, 'Busqueda exitosa', data);

    }).catch(error => {
      return status.error(res, 'No se obtuvieron registros', '', error);
      });

};


const getAllEmpresasWithUsers = async (req, res) =>{
  modelo.Usuario.findAll({
    include: [{
      model: modeloEmpresa, required: true
    }]
}).then(usuarios => {
  console.log(usuarios);
  console.log("despues del consultar");
  const data = usuarios.map(user => {

    return Object.assign({}, {
      username      : user.username,
      tipo          : user.tipo,
      estado        : user.estado,
      razonsocial  : user.Empresa.razonsocial,
      ruc  : user.Empresa.ruc
    });
  });

  return status.okGet(res, 'Busqueda exitosa', data);

  }).catch(error => {
    console.log(error);
    return status.error(res, 'No se obtuvieron registros', '', error);
    });

}



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
    createEmpresa, getAllEmpresas, getAllEmpresasWithUsers
    
}