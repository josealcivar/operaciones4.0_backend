'use strict';

const sequelize	  = require('../models').sequelize;
const modeloPersona = require('../models').Persona;
let status = require('../response/status');
let errors = require('../response/error');
const modelo = require('../models');


/**
 * @description funcion para crear una persona
 * @author jose alcivar garcia
 */

 
const createPerson = async (req,res) => {
  
    const dataPersona = {
        nombres   : req.body.nombres.toUpperCase(),
        apellidos     : req.body.apellidos.toUpperCase(),
        ruc             : req.body.ruc,
        email           : req.body.email,
        telefono        : req.body.telefono,
        rol             : req.body.rolId,
        username         : req.body.username,
        password         : req.body.password,
        tipoUser        : req.body.tipoUser, 
        jefeInmediato   : req.body.personaJefe,
        estado       : true,
        
    };
    let repeat = await modeloPersona.verifyRepeatPerson(dataPersona.ruc, dataPersona.email);
    if(repeat.length>0) return status.ERROR_ALLREADYEXIST(res,'Este registro ya existe');
    const t = await inicializarTransaccion();
    try{
       const cliente = await modeloPersona.createCliente(dataPersona, t);
       t.commit();
       return status.okCreate(res,'create Successfull', cliente);
    }catch(fail){
        t.rollback();
        return status.ERROR_SERVIDOR(res, fail);
    }
    
};

const getAllPersonas = async (req, res) =>{
  modeloPersona.findAll({
    include: [{
      model: modelo.Rol
    }]
  }).then(personas => {
    const data = personas.map(persona => {

      return Object.assign({}, {
        id      : persona.id,
        nombres   : persona.nombres,
        apellidos          : persona.apellidos,
        ruc         : persona.ruc,
        email      : persona.email,
        telefono          : persona.telefono,
        roles             :persona.Rol.nombre
        
      });
    });

    return status.okGet(res, 'Busqueda exitosa', data);

    }).catch(error => {
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
    createPerson,
    getAllPersonas
    
}