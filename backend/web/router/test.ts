import express, { Request, Response } from 'express';
import {redis} from "../db_connect";

const router: any = express.Router();

router.get("/api/test", async(req: Request, res: Response) => {
    const all = await redis.lrange("test:num:list", 0, -1);
    res.send(all);
});


export{router as testRouter};