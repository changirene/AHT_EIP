import express from 'express';
import {login, confirmLogin, logout} from "../controller/member.controller";
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
const router: any = express.Router();


router.post('/login', login);

router.get("/confirm/login", confirmLogin)

router.delete("/logout", logout)

export{router as memberRouter};