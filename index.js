import "dotenv/config";
import express from "express";
import "./database/connect_db.js";
import authRouter from './routes/auth.route.js'
import cookieParser from "cookie-parser";

/*
const authRouter = require ("./routes/auth.route.js");
const cors = require('cors');*/


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/', authRouter);

//app.set('port', process.env.PORT || 5000); 
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Corriendo en localhost: " + PORT));