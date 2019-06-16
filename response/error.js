module.exports.SEQUELIZE_VALIDATION_ERROR = (mensaje) => {
    return {
      tipo : 'Validation error',
      mensaje,
    };
  }
  
  module.exports.SEQUELIZE_FK_ERROR = (mensaje) => {
    return {
      tipo : 'Foreign key constraint error',
      mensaje,
    };
  }
  
  module.exports.SEQUELIZE_ERROR = (mensaje, tipo) => {
    return {
      tipo,
      mensaje,
    };
  }
  
  module.exports.ERROR_HANDLER = (fail) => {
    if ( fail.name === 'SequelizeValidationError' ) {
      return this.SEQUELIZE_VALIDATION_ERROR( fail.errors[0].message );
    }
    if ( fail.name === 'SequelizeForeignKeyConstraintError' ) {
      return this.SEQUELIZE_FK_ERROR( fail.original.code + ': ' + fail.index );
    }
    if ( fail.name === 'SequelizeUniqueConstraintError') {
      return this.SEQUELIZE_ERROR('Registro duplicado', fail.name);
    }
    if ( fail.name === 'ERR_INVALID_ARG_TYPE') {
      return this.SEQUELIZE_ARGUMENT_ERROR('datos vacios', fail.name);
    }
    
    return this.SEQUELIZE_ERROR(fail.message, fail.name);
  }