import express, { Request, Response, Router } from "express"
import { ITask } from "../Interfaces/Interfaces";
import Authentication from "../middleware/Authentication";
import Task from "../models/Task"

const RouterI: Router = express.Router();

RouterI.get("/all/:userId", Authentication, async (req: Request,res: Response) => {
    try {
        const task: ITask = await Task.findAll({where:{userId: req.params.userId}})
        if(!task){
            res.json({success:false,message:"Usuário não possui tarefas"})
        }else{
            res.json({tasks: task,success:true})
        }
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

RouterI.get("/:id", Authentication, async (req: Request,res: Response) => {
    try {
        const task: ITask = await Task.findOne({where:{id: req.params.id}})
        if(!task){
            res.json({success:false,message:"Tarefa não encontrada"})
        }else{
            res.json({task: task,success:true})
        }
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

RouterI.post("/", Authentication, async (req: Request,res: Response) => {
    try {
        const task: ITask = await Task.create({...req.body})
        res.json({task: task,success:true})
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

RouterI.put("/", Authentication, async (req: Request,res: Response) => {
    try {
        const task: ITask = await Task.update({...req.body},{where:{id: req.body.id}})
        if(task){
            const taskUpdated: ITask = Task.findOne({where:{id: req.body.id}})
            res.json({task: taskUpdated,success:true})
        }
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

RouterI.delete("/:id", Authentication, async (req: Request,res: Response) => {
    try {
        const task: any = await Task.destroy({where:{id: req.params.id}})
        res.json({success:true})
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

export default RouterI;