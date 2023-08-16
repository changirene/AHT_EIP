import express from 'express';
import {managementInterface} from "../controller/managementInterface.controller";

const router: any = express.Router();

router.get('/management/interface', managementInterface);

export{router as managementInterfaceRouter};