/*
@Descripcion: Modelo de Empresa
@Autor: jose Alcivar
@FechaCreacion: 08/09/2018
@UltimaFechaModificacion: 08/09/2018 @JoseAlcivar
*/
'use strict';

module.exports = function(sequelize, DataTypes) {
  var SubDepartamento = sequelize.define('SubDepartamento', {

    nombre: {
      type : DataTypes.STRING,
      allowNull : false
    },
    codigoSubDepartamento: {
        type : DataTypes.STRING,
        allowNull : false
      },
      latitud: {
        type : DataTypes.STRING,
        allowNull : true
      },
      longitud: {
        type : DataTypes.STRING,
        allowNull : false
      },
      
      telefonon: {
        type : DataTypes.STRING,
        allowNull : true
      },
    estado: {
      type      : DataTypes.BOOLEAN,
      allowNull : true
    }
    
  },{});

   SubDepartamento.associate = function(models){
    
    SubDepartamento.belongsTo(models.Empresa);
    SubDepartamento.belongsTo(models.Departamento);
  }


 /**
  * @description funcion para obtener una empresa por su Id
  * 
  */
//  Departamento.GetEmpresaById = async function(empresaId){
//       try{
//         return await Departamento.findOne({where:{id:empresaId}});
//       }catch(e){
//         return reject(errors.ERROR_HANDLER(fail));
//       }
//   };


  return SubDepartamento;

};
