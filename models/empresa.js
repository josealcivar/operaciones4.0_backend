/*
@Descripcion: Modelo de Empresa
@Autor: jose Alcivar
@FechaCreacion: 09/06/2019
@UltimaFechaModificacion: 09/06/2019 @JoseAlcivar
*/
'use strict';

let status = require('../response/status');
let errors = require('../response/error');

module.exports = function(sequelize, DataTypes) {
  var Empresa = sequelize.define('Empresa', {

    razonsocial: {
      type : DataTypes.STRING,
      allowNull : false
    },
     nombrecomercial: {
        type : DataTypes.STRING,
        allowNull : true
      },
      ruc: {
        type : DataTypes.STRING,
        allowNull : false
      },
      representantelegal: {
        type : DataTypes.STRING,
        allowNull : true
      },
      telefono: {
        type : DataTypes.STRING,
        allowNull : true
      },
      direccion: {
        type : DataTypes.STRING,
        allowNull : true
      },
  
    estado: {
      type      : DataTypes.BOOLEAN,
      allowNull : true
    }
  },{
  });  

//   Empresa.associate = function(models){
    
//    Empresa.belongsTo(models.TipoSubscripcion);
// }

 /**
  * @description funcion para crear una empresa
  * 
  */

 Empresa.createEmpresa = (ll_empresa, transaction) => {

  return new Promise ((resolve, reject) => {
    if(!ll_empresa.razonsocial) return reject(errors.SEQUELIZE_VALIDATION_ERROR('no ingreso razon social'));
    
    return Empresa.create(ll_empresa,{transaction}).then(empresa=>{
      return resolve(empresa);
      }).catch(fail=>{
        return reject(errors.ERROR_HANDLER(fail));
      });
    });
  };


  Empresa.verifyRepeatEmpresa = (ll_empresa)=>{
    console.log(" muestra la empresa por parametro");
    console.log(ll_empresa);
    return new Promise ((resolve,reject)=> {
      return Empresa.findAll({
        where:
        {
          // $or:[
          //   {
              razonsocial: ll_empresa.razonsocial
        //     }, 
        //     {  
        //        ruc:ll_empresa.ruc
        //     }
        //   ]
         }
        }).then(empresa=>{
          console.log("empresaaaaaa****************8");
          console.log(empresa);
          if(!empresa) return reject(empresa);
          return resolve(empresa);
         }).catch(fail=>{
           console.log("nuestra el error");
          console.log(fail);
          return reject(errors.ERROR_HANDLER(fail));
         });
  
    });
  };

  return Empresa;
  
};
