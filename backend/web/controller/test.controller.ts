import { Request, Response } from 'express';
// import {Animal} from "../model/news.model";
import {redis, sequelize} from "../db_connect";


const homepage: (req: Request, res: Response) => Promise<void> = async (req: Request, res: Response) => {
    try {
    //   const result = await Animal.findOne({
    //     where: {
    //       name: 'Dog'
    //     },
    //     limit: 1,
    //     order: [
    //       ["id", "DESC"]
    //     ],
    //   });
    //   console.log(result);
        // await redis.lpush("test:note:list", "aaa","bbb");
        // const all = await redis.lrange("test:note:list", 0, -1);
        //利用redis儲存消息動態的title，如果使用者點進去再去mysql抓詳細的細節
        //
        // res.send(all);
    res.render("test.html");

    } catch (err) {
      
    }
  }
  
//消息動態的第一頁存入redis，第一頁有更新的話，redis同步更改

export{homepage};