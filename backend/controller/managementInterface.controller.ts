import { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from "path";
dotenv.config();



const managementInterface: (req: Request, res: Response) => Promise<void> = async (req: Request, res: Response) => {
    try {      
      res.sendFile(path.join(__dirname, "/../frontend/dist/index.html"))
    } catch (err) {
      res.status(500).send({
        status: 'error',
        message: '畫面讀取失敗'
    })
    }
  }

  export{managementInterface};