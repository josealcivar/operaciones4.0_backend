/*
@Descripcion: Modelo de TipoPersona
@Autor: jose Alcivar
@FechaCreacion: 09/06/2019
@UltimaFechaModificacion: 09/06/2019 @JoseAlcivar
*/
'use strict';

module.exports = function(sequelize, DataTypes) {
  var Rol = sequelize.define('Rol', {

    nombre: {
      type : DataTypes.STRING,
      allowNull : false
    },
     nivel: {
        type : DataTypes.INTEGER,
        allowNull : true
      },
    estado: {
      type      : DataTypes.BOOLEAN,
      allowNull : true
    }
  },{
  });  

  Rol.associate = function(models){
    
    Rol.belongsTo(models.Empresa);
    
}

 /**
  * @description funcion para obtener una empresa por su Id
  * 
  */

 Rol.verifyRolUser = function(usuario){
  return new Promise((resolve, reject)=>{
    //if(!usuario.username){return reject(errors.SEQUELIZE_VALIDATION_ERROR('no ingreso username'));}
    //if(!usuario.password){return reject(errors.SEQUELIZE_VALIDATION_ERROR('no ingreso password'));}
    
    return Rol.findAll({
          where:{
              id: usuario.id,
              password: usuario.password,
              estado: usuario.estado
          }
  }).then(rol=>{
      if(!rol) return reject(rol); 
      return resolve(rol);
    }).catch(fail=>{
      return reject(errors.ERROR_HANDLER(fail));
    });
  });
};


Rol.createRol = (ll_rol, transaction)=> {

  return new Promise ((resolve, reject) => {
    if(!ll_rol.nombre) return reject(errors.SEQUELIZE_VALIDATION_ERROR('no ingreso nombre'));
    
    return Rol.create(ll_rol,{transaction}).then(roles=>{
      
      return resolve(roles);
      }).catch(fail=>{
        return reject(errors.ERROR_HANDLER(fail));
      });
    });
  };

  return Rol;

};
