/*
@Descripcion: Modelo de Persona
@Autor: jose Alcivar
@FechaCreacion: 09/06/2019
@UltimaFechaModificacion: 09/06/2019 @JoseAlcivar
*/
'use strict';

const errors = require('../response/error');
const status = require('../response/status');

module.exports = function(sequelize, DataTypes) {
  var Persona = sequelize.define('Persona', {

    nombres: {
      type : DataTypes.STRING,
      allowNull : false
    },
     apellidos: {
        type : DataTypes.STRING,
        allowNull : true
      },
      ruc: {
        type : DataTypes.STRING,
        allowNull : false
      },
      email: {
        type : DataTypes.STRING,
        allowNull : true
      },
      telefono: {
        type : DataTypes.STRING,
        allowNull : true
      },
      estado: {
        type : DataTypes.BOOLEAN,
        allowNull : true
      }
  },{
  });  

  Persona.associate = function(models){
    
    Persona.belongsTo(models.Empresa);
    Persona.belongsTo(models.Persona); 
    Persona.belongsTo(models.Departamento);
    Persona.belongsTo(models.SubDepartamento);
    Persona.belongsTo(models.Rol);
    Persona.belongsTo(models.Usuario);
}

 /**
  * @description funcion para obtener una empresa por su Id
  * 
  */
 Persona.verifyRepeatPerson = function(ll_ruc, email){
    
  return new Promise ((resolve,reject)=> {
    return Persona.findAll({where:
      {
        $or:[
          {
            ruc: ll_ruc
          }, 
          {  
             email:email 
          }
        ]
       }
      }).then(persona=>{
        return resolve(persona);
       }).catch(fail=>{
        return reject(errors.ERROR_HANDLER(fail));
       });

  });
};


Persona.GetPersonById = function(ll_idpersona){
    
  return new Promise ((resolve,reject)=> {
    return Persona.findAll(
      {
        where:{UsuarioId: ll_idpersona}
      }).then(persona=>{
        return resolve(persona);
       }).catch(fail=>{
        return reject(errors.ERROR_HANDLER(fail));
       });

  });
};


Persona.CreatePersona = (ll_persona, transaction) =>{

  return new Promise ((resolve, reject) => {
    //if(!ll_persona.razonsocial) return reject(errors.SEQUELIZE_VALIDATION_ERROR('no ingreso razon social'));
    if(!ll_persona.ruc) return reject(errors.SEQUELIZE_VALIDATION_ERROR('no ingreso ruc'));
    return Persona.create(ll_persona,{transaction}).then(persona=>{
      return resolve(persona);
      }).catch(fail=>{
        return reject(errors.ERROR_HANDLER(fail));
      });
    });

};
  

  return Persona;

};
