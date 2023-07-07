import express from 'express';
import { Request, Response } from 'express';
import {redis, sequelize} from "../db_connect";
import {getNews, putNews, deleteNews, patchNews, postNews} from "../controller/news.controller";
import { News } from '../model/news.model';
const router: any = express.Router();

// router.get('/test', async(req: Request, res: Response) => {
//     try{
//         await redis.lpush("newsTitle:list", 1, 'title1', 'datetime1');
//         await redis.lpush("newsTitle:list", 2, 'title2', 'datetime2');
//         await redis.lpush("newsTitle:list", 3, 'title3', 'datetime3');
//         await redis.lpush("newsTitle:list", 4, 'title4', 'datetime4');
//         await redis.lpush("newsTitle:list", 5, 'title5', 'datetime5');
//         await redis.lpush("newsTitle:list", 6, 'title6', 'datetime6');
//         await redis.lpush("newsTitle:list", 7, 'title7', 'datetime7');
//         await redis.lpush("newsTitle:list", 8, 'title8', 'datetime8');
//         await redis.lpush("newsTitle:list", 9, 'title9', 'datetime9');
//         const redisResult: string[] = await redis.lrange("newsTitle:list", 0, -1);
//         // const mysqlResult = await News.findAll();
//         res.status(200).send({
//             status: 'success',
//             redisData: redisResult
//         })


//     }catch(err){
//         res.status(500).send({
//             status: 'error',
//             message: err
//         })
//     }
// })

router.get('/news', getNews);

router.put('/news', putNews);

router.delete('/news', deleteNews);

router.patch('/news', patchNews);

router.post('/news', postNews);

export{router as newsRouter};