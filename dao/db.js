require('dotenv').config()
const sql = require('mysql');

const connect = sql.createConnection({
     host      : process.env.HOST,
     port      : process.env.DBPORT,
     user      : process.env.USER,
     password  : process.env.PASS,
     database  : process.env.NAME
})

setInterval(()=>{
     connect.query("SELECT version()");
},5000)

module.exports = connect