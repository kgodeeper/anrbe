require('dotenv').config();
const userDAO = require('../dao/user');
const jwt = require('jsonwebtoken');

const login_require = (req,res,next)=>{
     try{
          token = req.get('Authorization').split(' ')[1];
          jwt.verify(token,process.env.SECRET_STRING);
          next();
     }catch{
          res.sendStatus(401);
     }
}

module.exports = {
     login_require
}