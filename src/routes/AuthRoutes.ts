import express, { Request, Response } from "express"
import { Model } from "sequelize-typescript"
import { IUser } from "../Interfaces/Interfaces"
const Router = express.Router()
import User from "../models/User"
import bcrypt, { compareSync } from "bcrypt"
import jwt from "jsonwebtoken"

Router.post("/", async (req: Request, res: Response) => {
    try {
        const hasUser: IUser | any = await User.findOne({ where: { email: req.body.email } })
        if (!hasUser) {
            res.json({ success: false, message: "Email não cadastrado",field: "email" })
        } else {
            const isPassword: boolean = await compareSync(req.body.password, hasUser.password)
            if (isPassword) {
                const token = jwt.sign({...hasUser}, process.env.SECRET_KEY,{ expiresIn: '24h' })

                res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' ? true : false}).json({ success: true, user: hasUser,token: token })
            } else {
                res.json({ success: false, message: "Senha Incorreta",field: "password" })
            }
        }
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

Router.get("/", async (req: Request, res: Response) => {
    try {
        const token: string = req.cookies.token;
        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded){
                res.json({success:true,decoded: decoded})
            }else{
                res.json({ success: false, message: "Token inválido" })
            }
        } else {
            res.clearCookie("token").json({ message: 'Token nao informado', success: false });
        }
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

Router.delete("/logout", (req: Request, res: Response) => {
    if (req.cookies.token) {
        res.cookie('token', "", { httpOnly: true, sameSite: "none", secure: process.env.NODE_ENV === 'production' ? true : false }).json({ success: true })
    }
})

export default Router;