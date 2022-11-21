import "dotenv/config";
import "./database/connect_db.js";

import { } from "./config.js";
import "./util/initialSetup.js";

import express from "express";
import redirectRouter from "./routes/redirect.routes.js";
import authRouter from './routes/auth.routes.js';
import linkRouter from './routes/link.routes.js';
import testRouter from './routes/test.routes.js';
import questionRouter from './routes/question.routes.js';
import answerRouter from './routes/answer.routes.js';
import diagnosticRouter from './routes/diagnostic.routes.js';
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./swagger.json" assert { type: "json" };
//import cors from "cors"
//const swaggerUi = require('swagger-ui-express'),
//swaggerDocument = require('./swagger.json');

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

app.use(
  '/api/reference',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)  
);

//? EJEMPLO DE REDIRECT EN BACK
app.use('/', redirectRouter);
app.use('/api/auth', authRouter);
app.use('/api/links', linkRouter);
app.use('/api/tests', testRouter);
app.use('/api/questions', questionRouter);
app.use('/api/answers', answerRouter); 
app.use('/api/diagnostics', diagnosticRouter); 

//app.set('port', process.env.PORT || 5000); 
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Corriendo en localhost: " + PORT));