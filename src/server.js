import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";

import router from './routes/content.js';
dotenv.config();


const server = express()
// Middlewares
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use('/api/v1', router)


server.listen(process.env.PORT, process.env.HOST, ()=>{
    console.log(`Listen on: http://${process.env.HOST}:${process.env.PORT}`)
})