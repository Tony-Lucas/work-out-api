import express, { Request, Response } from "express"
import { Model } from "sequelize-typescript"
import { IUser } from "../Interfaces/Interfaces"
const Router = express.Router()
import User from "../models/User"
import bcrypt, { compareSync } from "bcrypt"
import jwt from "jsonwebtoken"

Router.post("/",async (req: Request,res: Response) => {
    try {
        const hasUser: IUser | any = await User.findOne({where:{email: req.body.email}})
        if(!hasUser){
            res.json({success:false,message:"Usuário não cadastrado"})
        }else{
            const isPassword: boolean = await compareSync(req.body.password,hasUser.password)
            if(isPassword){
                const token = jwt.sign(hasUser,process.env.SECRET_KEY)

                res.cookie("token",token,{httpOnly:true,sameSite: "none",secure: process.env.NODE_ENV === 'production' ? true : false}).json({success:true,user: hasUser})
            }else{
                res.json({success:false,message:"Senha Incorreta"})
            }
        }
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

Router.delete("/logout", (req: Request, res: Response) => {
    if (req.cookies.token) {
        res.cookie('token', "", { httpOnly: true, sameSite: "none", secure: process.env.NODE_ENV === 'production' ? true : false }).json({ success: true})
    }
})

export default Router;