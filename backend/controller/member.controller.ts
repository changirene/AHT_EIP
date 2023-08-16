import { Request, Response } from 'express';
import {Member} from "../model/member.model";
import dotenv from 'dotenv';
// import * as jwt from jsonwebtoken;
import cookieParser from 'cookie-parser';
import axios, { AxiosResponse } from 'axios';
dotenv.config();
const jwtSecretKey = process.env.JwtSecretKey


const login: (req: Request, res: Response) => Promise<void> = async (req: Request, res: Response) => {
    try{
        const result = await Member.findAll({
            attributes: ["account", "password", "member_id"],
            where: {
                account: req.body.account,
                password: req.body.password
            }
        });
        if(result.length === 0){
            res.status(400).send({
                status: 'error',
                message: '帳號密碼輸入錯誤'
            })
        }

        const token: object = {
            login: true,
            memberId: result[0].member_id
        };
        const expireTime: Date = new Date(Date.now() + 3600000 * 24 * 30);
        res.cookie('token', token, { httpOnly: true, expires: expireTime, signed: true })
       
        
        res.status(200).send({
            status: 'success',
            message: '登入成功'
        })
    
    }catch(err){
        res.status(500).send({
            status: 'error',
            message: '伺服器發生錯誤，請再試一次'
        })
    }
}

const confirmLogin: (req: Request, res: Response) => Promise<void> = async (req: Request, res: Response) => {
    try{
        const cookie = req.signedCookies.token;
        if(cookie === undefined || cookie === false){
            //cookie被竄改過的話，cookie的值會變成false
            res.clearCookie('token');
            res.status(400).send({
                status: 'error',
                message: "使用者尚未登入"
            })     
        }
        const memberId = cookie.memberId;
        res.status(200).send({
            status: 'success',
            message: "使用者已登入"
        })
    }catch(err){
        res.status(500).send({
            status: 'error',
            message: '伺服器發生錯誤，請再試一次'
        })
    }


}

const logout: (req: Request, res: Response) => Promise<void> = async (req: Request, res: Response) => {
    try{
        res.clearCookie('token');
        res.status(200).send({
            status: "success",
            message: "登出成功"
        })
    }catch(err){
        res.status(500).send({
            status: "success",
            message: "伺服器發生錯誤，登出失敗"
        })
    }
    
}


export{login, confirmLogin, logout};