import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.cookies.token;
        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            next()
        } else {
            res.clearCookie("token").json({message:'Token nao informado',success:false});
        }
    
    } catch (error: any) {
        res.json({success:false,message:error.stack})
    }
}