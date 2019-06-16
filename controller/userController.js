'use strict';

const sequelize	  = require('../models').sequelize;
const modeloUser = require('../models').Usuario;

const modeloEmpresa = require('../models').Empresa;
const modeloPersona = require('../models').Persona;
let status = require('../response/status');
let errors = require('../response/error');
const modelo = require('../models');

/**
 * @description funcion para crear una persona
 * @author jose alcivar garcia
 */

const createUser = async (req,res) => {
     console.log(req.body);
    const dataUser = {
        username: req.body.username,
        password: req.body.password, 
        tipo: req.body.tipo,  
        estado: true
    };

    let repeat = await modeloUser.verifyRepeatUser(dataUser);
    if(repeat.length>0) return status.ERROR_ALLREADYEXIST(res,'Este registro ya existe');
    const t = await inicializarTransaccion();
     
    try{
       const user = await modeloUser.createUser(dataUser, t);
       
       user.password="#######";
       
       t.commit();
         // return un password ficticio.
       return status.okCreate(res,'create Successfull', user);
    }catch(fail){
        t.rollback();
        return status.ERROR_SERVIDOR(res, fail);
    }
    
};


const createUserAdmin = async (req, res) => {

  const dataUserAdmin = {
    empresa: {
      razonsocial: req.body.razonsocial.toUpperCase(),
      nombrecomercial : req.body.nombrecomercial.toUpperCase(),
      ruc: req.body.ruc_empresa,
      representantelegal: req.body.representantelegal.toUpperCase(),
      telefono: req.body.telefonoEmpresa,
      direccion: req.body.direccion,
      estado: true
    },
    persona: {
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      ruc: req.body.ruc_persona,
      email: req.body.email,
      telefono: req.body.telefonoPersona,
      UsuarioId: 0,
      EmpresaId: 0,
      estado: true
    }, 
    usuario: {
      username         : req.body.username,
      password         : req.body.password, 
      tipo             : req.body.tipo,  
      EmpresaId: 0,
      estado       : true
    } 
  };
    
    let repeatEmpresa = await modeloEmpresa.verifyRepeatEmpresa(dataUserAdmin.empresa);
    if(repeatEmpresa.length>0) return status.ERROR_ALLREADYEXIST(res,'Esta registro de empresa o ruc ya existe');
     let repeatUser = await modeloUser.verifyRepeatUser(dataUserAdmin.usuario);
    if(repeatUser.length>0) return status.ERROR_ALLREADYEXIST(res,'Este usuario ya existe');
    let repeatPerson = await modelo.Persona.verifyRepeatPerson(dataUserAdmin.persona.ruc, dataUserAdmin.persona.email);
    if(repeatPerson.length>0) return status.ERROR_ALLREADYEXIST(res,'ruc o email ya existen');
   
    const t = await inicializarTransaccion();
    
    try{
      const empresa = await modeloEmpresa.createEmpresa(dataUserAdmin.empresa, t);
      
      
      dataUserAdmin.persona.EmpresaId = empresa.id;
      dataUserAdmin.usuario.EmpresaId = empresa.id;
      
      const user = await modeloUser.createUser(dataUserAdmin.usuario, t);
      
      dataUserAdmin.persona.UsuarioId = user.id;
      const persona = await modeloPersona.CreatePersona(dataUserAdmin.persona, t);
      
      t.commit();
         
       return status.okCreate(res,'create Successfull', empresa);
    }catch(fail){
        t.rollback();
        return status.ERROR_SERVIDOR(res, fail);
    }

};

const getAllUsers = async (req, res) =>{
    modeloUser.findAll({
    
  }).then(usuarios => {
    const data = usuarios.map(usuario => {

      return Object.assign({}, {

        username      : usuario.username,
        tipo          : usuario.tipo,
        estado        : usuario.estado
      });
    });

    return status.okGet(res, 'Busqueda exitosa', data);

    }).catch(error => {
      return status.error(res, 'No se obtuvieron registros', '', error);
      });

}

const getSuperUsers = async (req, res) => {
  modeloUser.findAll({
    
  }).filter(user => user.tipo === 'SUPERADMIN').then(usuarios => {
    const data = usuarios.map(usuario => {

      if (usuario.tipo === 'SUPERADMIN') {
        return Object.assign({}, {
          username      : usuario.username,
          tipo          : usuario.tipo,
          estado        : usuario.estado
        });
      }
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
    createUser, getAllUsers,
    createUserAdmin,
    getSuperUsers
}