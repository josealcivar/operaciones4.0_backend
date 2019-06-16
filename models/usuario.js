/*
@Descripcion: Modelo de TipoPersona
@Autor: jose Alcivar
@FechaCreacion: 09/06/2019
@UltimaFechaModificacion: 09/06/2019 @JoseAlcivar
*/
'use strict';
const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var Usuario = sequelize.define('Usuario', {

    username: {
      type : DataTypes.STRING,
      allowNull : false
    },
     password: {
        type : DataTypes.STRING,
        allowNull : true
      },
     tipo: {
        type : DataTypes.ENUM('SUPERADMIN', 'ADMIN', 'SUPERVISOR', 'OBRERO'),
        allowNull : true
      },
    estado: {
      type      : DataTypes.BOOLEAN,
      allowNull : true
    }
  },{
  });  

  Usuario.associate = function(models){
    
    Usuario.belongsTo(models.Empresa);
}


Usuario.verifyUser = function(usuario){
    return new Promise((resolve, reject)=>{
      if(!usuario.username){return reject(errors.SEQUELIZE_VALIDATION_ERROR('no ingreso username'));}
      if(!usuario.password){return reject(errors.SEQUELIZE_VALIDATION_ERROR('no ingreso password'));}
      console.log(usuario);
      return Usuario.findAll({
            where:{
                username: usuario.username,
                estado: usuario.estado
            }
        }).then(user=>{

            if(!user) return reject(user);
            return resolve(user);
         
      }).catch(fail=>{
        return reject(errors.ERROR_HANDLER(fail));
      });
    });
  };

//password: usuario.password,
  Usuario.verifyRepeatUser = function(usuario){
    return new Promise((resolve, reject)=>{
      if(!usuario.username){return reject(errors.SEQUELIZE_VALIDATION_ERROR('no ingreso username'));}
      if(!usuario.password){return reject(errors.SEQUELIZE_VALIDATION_ERROR('no ingreso password'));}
      
      return Usuario.findAll({
            where:{
                username: usuario.username,
                
                estado: usuario.estado
            }
        }).then(user=>{
            
        if(!user) return reject(user);
        return resolve(user);
      }).catch(fail=>{
        return reject(errors.ERROR_HANDLER(fail));
      });
    });
  };


  Usuario.verifyUserById = function(ll_usuario){
    return new Promise((resolve, reject)=>{
      if(!ll_usuario){return reject(errors.SEQUELIZE_VALIDATION_ERROR('no ingreso id usuario'));}
      
      return Usuario.findOne({
            id: ll_usuario
        }).then(user=>{
          console.log(user);
        if(!user) return reject(user);
        return resolve(user);
      }).catch(fail=>{
        return reject(errors.ERROR_HANDLER(fail));
      });
    });
  };


  Usuario.comparePassword=(password, encryptedpass)=>{
return new Promise((resolve, reject)=>{
  if(!password) return reject(errors.SEQUELIZE_VALIDATION_ERROR('no existe password'));

      bcrypt.compare(password, encryptedpass).then(result=>{
        return resolve(result);
    }).catch(err=>{
        console.log("hubo un error");
        return reject(err);
    });
});

  };

  Usuario.createUser = (ll_usuario, transaction)=> {

  return new Promise ((resolve, reject) => {
    if(!ll_usuario.username) return reject(errors.SEQUELIZE_VALIDATION_ERROR('no ingreso username'));
    if(!ll_usuario.password) return reject(errors.SEQUELIZE_VALIDATION_ERROR('no ingreso password'));
  
    bcrypt.hash(ll_usuario.password, 12).then(pass=>{
      ll_usuario.password=pass;
        
        return Usuario.create(ll_usuario,{transaction}).then(usuario=>{
        
          return resolve(usuario);
          }).catch(fail=>{
            return reject(errors.ERROR_HANDLER(fail));
          });
        });

    }).catch(err=>
      {
        next();
      }
    );



  
  };
  

return Usuario;

};
