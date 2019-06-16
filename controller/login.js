/**
 * @description controllador del login con authentication para el ingreso al sistema
 * @author jose alcivar garcia
 * @Modificated 8/06/2019
 * @created 8/06/2019
 * 
 */
  
const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 let status = require('../response/status');
 let errors = require('../response/error');
const ModeloUsuario = require('../models').Usuario;
const ModeloRoles = require('../models').Rol;
const ModeloPersona = require('../models').Persona;


require("dotenv").config();

let refreshTokenList={};

 const login = async(req, res)=>{

    res.header("Cache-control", "no-cache, private, no-storoe, must-revalidate, max-stale=0, pre-check=0");
    //res.header("Expires", "Fri")
    try{
        userdata={
            username: req.body.username,
            password: req.body.password,
            estado: true
        }
        
        let usuario = await ModeloUsuario.verifyUser(userdata);
        
        if(usuario.length==0)return status.errorNotFound(res,'usuario incorrecto');
        let passValid = await ModeloUsuario.comparePassword(userdata.password, usuario[0].password);
        if(!passValid) return status.apiAuthError(res, 'password incorrectos');
       
       let key_secret = process.env.SECRET_KEY;
       if(usuario[0].id!= 0){
        let persona = await ModeloPersona.GetPersonById(usuario[0].id);
       }
       
       const payload ={
            empresa: usuario[0].EmpresaId,
            tipo: usuario[0].tipo,
            id:usuario[0].id
       }

       console.log(payload);
       console.log(process.env.SESSION_DURATION);
       let duration = process.env.SESSION_DURATION;

       const token = jwt.sign(payload, key_secret,{expiresIn:5000});

        req.session = token;
        req.headers['Authorization']=token;
        
        return res.status(200).json({
            status : true,
            token  : token,
            tipo: usuario[0].tipo
            }); 
        
    }catch(fail){
        return status.ERROR_SERVIDOR(res, fail.errors);
    }
 }

 const logout = (req,res)=>{
    res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
    //res.header("Expires", "Fri, 31 Dec 1998 12:00:00 GMT");
    req.session = null;
    delete req.session;
    delete req.headers.Authorization;
  return res.status(200).json({ error: false, token: null });

 }


 const refreshToken = async (req,res)=>{


}



 module.exports = {
     login, logout, refreshToken
 }