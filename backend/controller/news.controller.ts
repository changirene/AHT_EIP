import { Request, Response } from 'express';
import {News} from "../model/news.model";
import {redis, sequelize} from "../db_connect";
import moment from 'moment-timezone';
import axoios from 'axios';
const { literal,fn } = require('sequelize');
sequelize.addModels([News]);
moment.tz.setDefault('Asia/Taipei');

interface getData{
    newsId: number,
    newsAddDate: string,
    newsTitle: string
}

const getNews: (req: Request, res: Response) => Promise<void> = async (req: Request, res: Response) => {
    //取得標題、id、時間
    try{
        const result = await News.findAll({
            where: {
                NewsStatus: 0
            },
            attributes: [
                'NewsId', 
                'NewsTitle', 
                [literal('SUBSTRING(NewsAddDate, 1, 10)'), 'NewsAddDate'],
                'NewsContent'
            ],
            order: [['NewsId', 'DESC']]
        });
   
        // const result: string[] = await redis.lrange("newsTitle:list", 0, -1);
        // let newsDataArr: getData[] = [];
        // let newsDataObj: getData = {
        //     newsId: parseInt(result[2]),
        //     newsAddDate: result[0],
        //     newsTitle: result[1]
        // };
        // newsDataArr.push(newsDataObj);
        // for(let i = 3; i < result.length; i += 3){
        //     newsDataObj = {
        //         newsId: parseInt(result[i + 2]),
        //         newsAddDate: result[i],
        //         newsTitle: result[i + 1]
        //     }
        //     newsDataArr.push(newsDataObj);
        // }
        const response: object = {
            status: 'success',
            data: result
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
        let newsId;
        // const redisTotalCount: number = 168;
        // const listLength: number = await redis.llen("newsTitle:list");
        // if(listLength >= redisTotalCount){
        //     newsId = await redis.lrange("newsTitle:list", -1, -1); //取得下架的id
        //     await redis.ltrim("newsTitle:list", 0, 164); //只保留前165個data

        await News.update( //下架news
            {
                NewsStatus: 1
            },
            {
                where: {NewsId: newsId}
            }
        )
        // }
	    const currentTime = moment();
	    const date = currentTime.format().substring(0,10) + " " + currentTime.format().substring(11,19);
        const createdNews  = await News.create({
	    NewsAddDate: date,
            NewsTitle: req.body.newsTitle,
            NewsContent: req.body.newsContent
        })
        const { NewsId, NewsAddDate } = createdNews;
        // await redis.lpush("newsTitle:list", createdNews.NewsId, req.body.newsTitle, date);
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
    try{
        await News.destroy({
            where: {
                NewsId: parseInt(req.body.newsId)
            }
        })
        // const results: string[] = await redis.lrange("newsTitle:list", 0, -1);
        // const resultIndex: number = results.indexOf(`${req.body.newsId}`);
        // const start = resultIndex - 2;
        // const end = resultIndex;
        // const valuesToRemove = await redis.lrange("newsTitle:list", start, end);
        // for (const value of valuesToRemove) {
        //     await redis.lrem("newsTitle:list", 1, value);
        // }
        
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
            // const results: string[] = await redis.lrange("newsTitle:list", 0, -1);
            // const titleIndex: number = results.indexOf(`${req.body.newsId}`) - 1;
            // await redis.lset("newsTitle:list", titleIndex, req.body.newsTitle); //更新redis title
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
