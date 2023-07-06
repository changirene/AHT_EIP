import { Request, Response } from 'express';
import {News} from "../model/news.model";
import {redis, sequelize} from "../db_connect";
import dotenv from 'dotenv';
import path from "path";
dotenv.config();

sequelize.addModels([News]);

const homepage: (req: Request, res: Response) => Promise<void> = async (req: Request, res: Response) => {
    try {      
      res.sendFile(path.join(__dirname, "/../../dist/index.html"))
    } catch (err) {
      res.status(500).send({
        status: 'error',
        message: '畫面讀取失敗'
    })
    }
  }
  
//消息動態的第一頁存入redis，第一頁有更新的話，redis同步更改

export{homepage};