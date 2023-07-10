import express from 'express';
import { Request, Response } from 'express';
import {redis, sequelize} from "../db_connect";
import {getNews, putNews, deleteNews, patchNews, postNews} from "../controller/news.controller";
import { News } from '../model/news.model';
const router: any = express.Router();



router.get('/news', getNews);

router.put('/news', putNews);

router.delete('/news', deleteNews);

router.patch('/news', patchNews);

router.post('/news/content', postNews);

export{router as newsRouter};