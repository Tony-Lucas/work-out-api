import express, { Request, Response, Router } from "express"
import { IProject, IUserProjects } from "../Interfaces/Interfaces";
import Authentication from "../middleware/Authentication";
import Project from "../models/Project"
import UserProject from "../models/UserProject";

const RouterI: Router = express.Router();

RouterI.get("/:id", Authentication, async (req: Request, res: Response) => {
    try {
        const project: IProject = await Project.findOne({ where: { id: req.params.id } })
        const userProject: IUserProjects = await UserProject.findOne({where:{userId: req.params.id}})
        console.log(userProject)
        if (!project) {
            res.json({ success: false, message: "Projeto não encontrado" })
        } else {
            res.json({ project: project, success: true })
        }
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

RouterI.post("/", Authentication, async (req: Request, res: Response) => {
    try {
        const project: IProject = await Project.create({ ...req.body })
        res.json({ project: project, success: true })
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

RouterI.put("/", Authentication, async (req: Request, res: Response) => {
    try {
        const project: IProject = await Project.update({...req.body},{ where: { id: req.body.id } })
        if (!project) {
            const projectUpdated: IProject = await Project.findOne({ where: { id: req.body.id } })
            res.json({ project: projectUpdated, success: true })
        }
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

RouterI.delete("/:id", Authentication, async (req: Request, res: Response) => {
    try {
        const project: any = await Project.destroy({ where: { id: req.params.id } })
        res.json({ success: true })
    } catch (error: any) {
        res.json({ success: false, message: error.stack })
    }
})

export default RouterI;