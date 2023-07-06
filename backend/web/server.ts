import express, { Request, Response } from 'express';
import {redis, sequelize} from "./db_connect";
import {testRouter} from "./router/test";
import {authRouter} from "./router/auth.router";
import {homepage} from "./controller/test.controller";
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import swaggerJsDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
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
app.use('/auth', authRouter);
app.get('/', homepage);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))


const Google_Client_Id: string = process.env.Google_Client_Id as string;
const Google_Client_Secret: string = process.env.Google_Client_Secret as string;
passport.use(new GoogleStrategy({
    clientID: Google_Client_Id,
    clientSecret: Google_Client_Secret,
    callbackURL: "http://localhost:3000/auth/google/callback",
    
  },
  function(request: any, accessToken: any, refreshToken: any, profile: any, done: any) {
    console.log(request);
    return done(null, profile);
  }));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });