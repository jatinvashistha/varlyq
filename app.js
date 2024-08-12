const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const db = require('./config/db');
const userRouter = require('./routes/User');
const postRouter = require('./routes/Post');
db.databaseConnection();
 
 app.use(express.json());
 app.use(
   express.urlencoded({
     extended: true,
   })
 );


 app.use(
   cors({
     origin: '*',
     credentials: true,
     methods: ["GET", "POST", "PUT", "DELETE"],
   })
 );
app.use('/user', userRouter)
app.use('/post',postRouter)





module.exports = app;