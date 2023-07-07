import express from 'express';
import {redis, sequelize} from "./db_connect";
import {newsRouter} from "./router/news.router";
import {homepage} from "./controller/homepage.controller";
import swaggerJsDoc from 'swagger-jsdoc';
import {News} from "./model/news.model";
import * as bodyParser from 'body-parser';
import path from "path";
import * as swaggerUi from 'swagger-ui-express';
import dotenv from "dotenv";
import { Request, Response } from 'express';


dotenv.config();


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',

        info: {
            title: "EIP API",
            version: '1.0.0',
            description: "EIP API Information"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["server.js", "./router/*.ts", "./swagger/*.ts"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app: any = express();
// sequelize.addModels([Animal]);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.static(process.cwd() + "/frontend/dist"))
app.get('/', homepage);
app.use('/', newsRouter);



process.on('uncaughtException', (err, origin) => {
    //code to log the errors
    console.log(
        `Caught exception: ${err}\n` +
        `Exception origin: ${origin}`,
    );
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });