/*
@Descripcion: Modelo de Tipo Subscripcion
@Autor: jose Alcivar
@FechaCreacion: 05/06/2019
@UltimaFechaModificacion: 05/06/2019 @JoseAlcivar
*/
'use strict';



module.exports = function(sequelize, DataTypes) {
  var TipoSubscripcion = sequelize.define('TipoSubscripcion', {

    descripcion: {
      type : DataTypes.STRING,
      allowNull : false
    },
     numeroUsers: {
        type : DataTypes.STRING,
        allowNull : true
      },
    estado: {
      type      : DataTypes.BOOLEAN,
      allowNull : true
    }
  },{
   

  });

  TipoSubscripcion.associate = function(models){
    
    TipoSubscripcion.belongsTo(models.Empresa);
 }

 /**
  * @description funcion para obtener una empresa por su Id
  * 
  */
//  TipoSubscripcion.GetEmpresaById = async function(empresaId){
//       try{
//         return await TipoSubscripcion.findOne({where:{id:empresaId}});
//       }catch(e){
//         return reject(errors.ERROR_HANDLER(fail));
//       }
//   };


  return TipoSubscripcion;

};
