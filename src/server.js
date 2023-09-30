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

server.use('*', (req, res) => {
    res.status(404).send(`<h1>Error 404</h1><h3>Error 404: La URL indicada no existe en este servidor</h3>`);
});
server.listen(process.env.PORT, process.env.HOST, ()=>{
    console.log(`Listen on: http://${process.env.HOST}:${process.env.PORT}`)
})