import "dotenv/config";
import "./database/connect_db.js";

import express from "express";
import redirectRouter from "./routes/redirect.routes.js";
import authRouter from './routes/auth.route.js';
import linkRouter from './routes/link.route.js';
import cookieParser from "cookie-parser";
import cors from "cors"


/*const authRouter = require ("./routes/auth.route.js");
const cors = require('cors');*/
const app = express();

/*const whiteList = [process.env.ORIGIN2]

app.use(cors({
    origin: function(origin, callback){
        if(whiteList.includes(origin))
            return callback(null, origin);
        return callback("Error de CORS origin: " + origin + ". No autorizado!");
    }
}));*/


app.use(express.json());
app.use(cookieParser());


//? EJEMPLO DE REDIRECT EN BACK
app.use('/', redirectRouter);
app.use('/api/auth', authRouter);
app.use('/api/links', linkRouter);

//app.set('port', process.env.PORT || 5000); 
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Corriendo en localhost: " + PORT));