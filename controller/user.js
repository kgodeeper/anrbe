const userDAO = require('../dao/user');
const jwt = require('jsonwebtoken');

const user_login = (req,res)=>{
     user = {
          username:req.body.username,
          password:req.body.password,
          token:req.body.token,
          fullname:req.body.fullname
     }
     userDAO.user_login(user)
     .then((data)=>{
          if(data.username != null){
               if(data.token == '' || data.token == null){
                    data.token = jwt.sign({username:data.username},process.env.SECRET_STRING);
                    userDAO.update_token(data.username,data.token).then().catch();
               }
          }
          res.status(200).json(data);
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const user_register = (req,res)=>{
     user = {
          username:req.body.username,
          password:req.body.password,
          token:req.body.token,
          fullname:req.body.fullname
     }
     userDAO.user_register(user)
     .then((data)=>{
          res.status(200).json(data);
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

module.exports = {
     user_login,
     user_register
}