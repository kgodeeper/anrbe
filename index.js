require('dotenv').config();
const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');

const router = require('./router');

const app = express();
app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));
app.use(router);

app.listen(process.env.PORT || 1711,()=>{
     console.log(`Server is running on port: ${process.env.PORT}`);
});