import { Request, Response } from 'express';
import {News} from "../model/news.model";
import {redis, sequelize} from "../db_connect";
sequelize.addModels([News]);

interface getData{
    newsId: number,
    newsAddDate: string,
    newsTitle: string
}

const getNews: (req: Request, res: Response) => Promise<void> = async (req: Request, res: Response) => {
    try{
        const result: string[] = await redis.lrange("newsTitle:list", 0, -1);
        let newsDataArr: getData[] = [];
        let newsDataObj: getData = {
            newsId: parseInt(result[2], 10),
            newsAddDate: result[0],
            newsTitle: result[1]
        };
        newsDataArr.push(newsDataObj);
        for(let i = 3; i < result.length; i += 3){
            newsDataObj = {
                newsId: parseInt(result[i + 2], 10),
                newsAddDate: result[i],
                newsTitle: result[i + 1]
            }
            newsDataArr.push(newsDataObj);
        }
        const response: object = {
            status: 'success',
            data: newsDataArr
        }
        res.status(200).send(response);
    }catch(err){
        res.status(500).send({
            status: 'error',
            message: '資料取得失敗，請重新再試一次'
        })
    }
}


const putNews: (req: Request, res: Response) => Promise<void> = async (req: Request, res: Response) => {
    //新增
    try{
        let NewsId;
        const listLength: number = await redis.llen("newsTitle:list");
        if(listLength >= 168){
            NewsId = await redis.lrange("titleAndDate:list", -1, -1); //取得下架的id
            await redis.ltrim("titleAndDate:list", 0, 164); //只保留前165個data
        }
        await redis.lpush("titleAndDate:list", 1, 'title', 'datetime');
        await News.update( //下架news
            {
                NewsStatus: 1
            },
            {
                where: {NewsId: NewsId}
            }
        )
        await News.create({
            NewsTitle: req.body.newsTitle,
            NewsContent: req.body.newsContent
        })
        res.status(200).send({
            status: 'success',
            message: '新增成功'
        })
    }catch(err){
        res.status(500).send({
            status: 'error',
            message: '新增失敗'
        })
    }
}

const deleteNews: (req: Request, res: Response) => Promise<void> = async (req: Request, res: Response) => {
    //delete mysql's data and redis's data
    //把刪除的redis data從mysql裡補上
    try{
        await News.destroy({
            where: {
                NewsId: 2
            }
        })

        
        res.status(200).send({
            status: 'success',
            message: '刪除成功'
        })

    }catch(err){
        res.status(500).send({
            status: 'error',
            message: '刪除失敗'
        })
    }
}

const patchNews: (req: Request, res: Response) => Promise<void> = async (req: Request, res: Response) => {
    //編輯
    try{
        if(req.body.newsTitle){
            await News.update(
                {
                    NewsTitle: req.body.newsTitle
                },
                {
                    where: {NewsId: req.body.newsId}
                }
            )
        }
        if(req.body.newsContent){
            await News.update(
                {
                    NewsContent: req.body.newsContent
                },
                {
                    where: {NewsId: req.body.newsId}
                }
            )
        }
        res.status(200).send({
            status: 'success',
            message: '編輯成功'
        })
    }catch(err){
        res.status(500).send({
            status: 'error',
            message: '編輯失敗'
        })
    }
}

const postNews: (req: Request, res: Response) => Promise<void> = async (req: Request, res: Response) => {
    //取得消息動態的文章內容
    try{
        const result = await News.findOne({
            where: {
              NewsId: req.body.newsId
            },
            attributes: ['NewsContent'],
          });
          
        res.status(200).send({
            status: 'success',
            newsContent: result})
    }catch(err){
        res.status(500).send({
            status: 'error',
            message: '取得資料失敗'
        })
    }
}

export{getNews, putNews, deleteNews, patchNews, postNews};