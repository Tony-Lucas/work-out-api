import express, { Request, Response, Router } from "express"
import Authentication from "../middleware/Authentication";
import ProjectTask from "../models/ProjectTask";
import bcrypt from "bcrypt"
import { IProjectTasks } from "../Interfaces/Interfaces";

const RouterI: Router = express.Router();

RouterI.get("/:id", Authentication, async (req: Request, res: Response) => {
    try {
        const projectTask: IProjectTasks = await ProjectTask.findOne({ where: { id: req.params.id } })
        if (!projectTask) {
            res.json({ success: false, message: "Tarefa não encontrada" })
        } else {
            res.json({ projectTask: projectTask, success: true })
        }
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

RouterI.post("/", Authentication, async (req: Request, res: Response) => {
    try {
        const projectTask: IProjectTasks = await ProjectTask.create({ ...req.body });
        res.json({ projectTask: projectTask, success: true })
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

RouterI.put("/", Authentication, async (req: Request, res: Response) => {
    try {
        const projectTask: IProjectTasks = await ProjectTask.update({ ...req.body }, { where: { id: req.body.id } });
        if (projectTask) {
            const projectTaskUpdated: IProjectTasks = await ProjectTask.findOne({ where: { id: req.body.id } })
            res.json({ projectTask: projectTaskUpdated, success: true })
        } else {
            res.json({ success: false, message: "Tarefa não encontrada" })
        }
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

RouterI.delete("/:id", Authentication, async (req: Request, res: Response) => {
    try {
        const projectTask = await ProjectTask.destroy({where:{id:req.params.id}})
        res.json({success:true})
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

export default RouterI;