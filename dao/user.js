const con = require('./db');
const crypto = require('crypto');

const user_login = (user)=>{
     return new Promise((rs,rj)=>{
          username = user.username;
          password = crypto.createHash("sha256").update(user.password).digest("hex");
          sql = `SELECT username,password,token,fullname FROM tbl_user WHERE username='${username}' AND password ='${password}'`;
          con.query(sql,(error,result)=>{
               if(error) rj(error);
               else{
                    if(result.length>0) rs(result[0]);
                    else rs({username:null,password:null,token:null,fullname:null});
               }
          })
     })
}

const user_register = (user)=>{
     return new Promise((rs,rj)=>{
          username = user.username;
          fullname = user.fullname;
          password = crypto.createHash("sha256").update(user.password).digest("hex");
          sql = `SELECT * FROM tbl_user WHERE username='${username}'`;
          con.query(sql,(error,result)=>{
               if(error) rj(error);
               else{
                    if(result.length>0){
                         rs({username:'',password:'',token:'',fullname:''});
                    }
                    else{
                         sql = `INSERT INTO tbl_user(username,password,fullname) VALUES(
                              '${username}','${password}','${fullname}'
                         )`;
                         con.query(sql,(error,result)=>{
                              if(error) rj(error);
                              else{
                                   rs({
                                        username,
                                        password:'',
                                        fullname,
                                        token:''
                                   })
                              }
                         })
                    }
               }
          })
     })
}

const update_token = (username,token)=>{
     return new Promise((rs,rj)=>{
          sql = `UPDATE tbl_user set token = '${token}' WHERE username='${username}'`;
          con.query(sql,(error,result)=>{
               error ? rj(error) : rs(result);
          })
     })
}

module.exports = {
     user_login,
     user_register,
     update_token
}