import express, { NextFunction, Request, Response, Router } from "express"
import Authentication from "../middleware/Authentication";
import User from "../models/User"
import bcrypt from "bcrypt"
import { IUser } from "../Interfaces/Interfaces";
import multer from "multer"
import multerS3 from "multer-s3"
import aws from "aws-sdk"
import { ManagedUpload, PutObjectRequest } from "aws-sdk/clients/s3";

const RouterI: Router = express.Router();

const s3 = new aws.S3({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: "us-east-1"
})

const uploadToS3 = async (file: any) => {

    const params: PutObjectRequest = {
        Bucket: process.env.BUCKET_NAME || "",
        Key: `${Date.now()}${file.originalname}`,
        Body: file.buffer
    }

    const result = await s3.upload(params, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            return params.Key
        }
    })

    return result.promise().then((data => data))
}

const deleteObjectS3 = async (filename: string) => {

    const params: any = {
        Bucket: process.env.BUCKET_NAME || "",
        Key: filename || ""
    }

    const result = await s3.deleteObject(params, (err, data) => {

    })

    return result.promise().then((data => data))

}


const upload = multer()


RouterI.post("/register", async (req: Request, res: Response) => {
    try {
        const hasUser: IUser = await User.findOne({ where: { email: req.body.email } })
        if (hasUser) {
            res.json({ success: false, message: "Usuário ja cadastrado" })
        } else {
            const hash: string = bcrypt.hashSync(req.body.password, 10)
            const UserResult = await User.create({ ...req.body, password: hash });
            res.json({ user: UserResult, success: true })
        }
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

RouterI.post("/change-photo", Authentication, upload.single("img"), async (req: Request, res: Response) => {
    try {
        const user: IUser = await User.findOne({ where: { id: req.body.id } })
        if (user.imgUrl) {
            const result = await deleteObjectS3(user.imgName)
            const fileName = await uploadToS3(req.file)
            const userUpdated: IUser = await User.update({ imgName: fileName.Key, imgUrl: fileName.Location }, { where: { id: req.body.id } })
            res.json({ success: true, user: userUpdated })
        } else {
            const fileName = await uploadToS3(req.file)
            const userUpdated: IUser = await User.update({ imgName: fileName.Key, imgUrl: fileName.Location }, { where: { id: req.body.id } })
            res.json({ success: true, user: userUpdated })
        }
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

RouterI.get("/:id", Authentication, async (req: Request, res: Response) => {
    try {
        const user: IUser = await User.findOne({ where: { id: req.params.id } })
        if (user) {
            res.json({ success: true, user: user })
        } else {
            res.json({ success: false, message: "Usuário não encontrado" })
        }
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

RouterI.put("/", Authentication, async (req: Request, res: Response) => {
    try {
        const user: any = await User.update({ ...req.body }, { where: { id: req.body.id } })
        if (user) {
            const userUpdated: IUser = await User.findOne({ where: { id: req.body.id } })
            res.json({ success: true, user: userUpdated })
        } else {
            res.json({ success: false, message: "Usuário não encontrado" })
        }
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

export default RouterI;