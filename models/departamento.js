/*
@Descripcion: Modelo de Empresa
@Autor: jose Alcivar
@FechaCreacion: 08/09/2018
@UltimaFechaModificacion: 08/09/2018 @JoseAlcivar
*/
'use strict';


module.exports = function(sequelize, DataTypes) {
  var Departamento = sequelize.define('Departamento', {

    nombre: {
      type : DataTypes.STRING,
      allowNull : false
    },
    codigoDepartamento: {
        type : DataTypes.STRING,
        allowNull : false
      },
      latitud: {
        type : DataTypes.STRING,
        allowNull : true
      },
      longitud: {
        type : DataTypes.STRING,
        allowNull : true
      },
      
      telefono: {
        type : DataTypes.STRING,
        allowNull : true
      },
    estado: {
      type      : DataTypes.BOOLEAN,
      allowNull : true
    }
  },{
   

  });
  Departamento.associate = function(models){
    
    Departamento.belongsTo(models.Empresa);
 }


 /**
  * @description funcion para obtener una empresa por su Id
  * 
  */
 Departamento.createDepartment = (ll_departamentos, transaction)=> {

  return new Promise ((resolve, reject) => {
    if(!ll_departamentos.nombre) return reject(errors.SEQUELIZE_VALIDATION_ERROR('no ingreso nombre'));
    if(!ll_departamentos.codigoDepartamento) return reject(errors.SEQUELIZE_VALIDATION_ERROR('no ingreso codigo'));
    return Departamento.create(ll_departamentos,{transaction}).then(departamento=>{
      
      return resolve(departamento);
      }).catch(fail=>{
        return reject(errors.ERROR_HANDLER(fail));
      });
    });
  };

  return Departamento;

};
