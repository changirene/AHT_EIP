import express from 'express';
import {login, confirmLogin} from "../controller/member.controller";
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
const router: any = express.Router();


router.post('/login', login);

router.get("/confirm/login", confirmLogin)

export{router as memberRouter};