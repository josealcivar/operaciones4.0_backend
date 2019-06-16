
const dotenv = require("dotenv");
dotenv.config();

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJWT = require('passport-jwt').ExtractJwt;
const ModelUser = require('../models').Usuario;

let errors = require('../../../operaciones4.0_backend/response/error');
let status = require('../../../operaciones4.0_backend/response/status');
// jwtFromRequest: ExtractJWT.fromHeader("Authorization"),
const opts = {};
opts.jwtFromRequest = ExtractJWT.fromHeader('Authorization');
opts.secretOrKey = 'Op3r4c10n3$4.0';

passport.use(new JwtStrategy(opts, async (jwtPayload, cb)=>{
    try{
        
        let user = await ModelUser.verifyUserById(jwtPayload.id);
        if(user.length==0)  return cb(null, false, { error: true, data: { message: "Usuario o contraseña incorrectos" } });
        return cb(null, user, { error: false, message: "OK" });
    }catch(fail){
        return cb({
            error: true,
            data:{ message: fail.message }
    });
    }
    
}));


