import express from 'express';
import {login, confirmLogin} from "../controller/member.controller";
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
const router: any = express.Router();
router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/login', login);

router.get("/confirm/login", confirmLogin)

export{router as memberRouter};