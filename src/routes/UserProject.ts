import express, { Request, Response, Router } from "express"
import { IProject, IUserProjects } from "../Interfaces/Interfaces"
import Authentication from "../middleware/Authentication"
import Project from "../models/Project"
import User from "../models/User"
import UserProject from "../models/UserProject"
const RouterI: Router = express.Router()

RouterI.get("/:userId", Authentication, async (req: Request, res: Response) => {
    let projects: IProject[] = []
    const result: IUserProjects[] = await UserProject.findAll({ where: { userId: req.params.userId } })
    let count: number = result.length
    result.forEach(async (item) => {
        const project: IProject = await Project.findOne({ where: { id: item.projectId } })
        projects.push(project)
        count--
        if(count === 0){
            res.json({ success: true, projects: projects, userProject: result })
        }
    })
})

RouterI.get("/name/:projectName", Authentication, async (req: Request, res: Response) => {
    const project: IProject = await Project.findOne({ where: { name: req.params.projectName } })
    res.json({success:true,project: project})
})

RouterI.post("/", Authentication, async (req: Request, res: Response) => {
    const result: IUserProjects = await UserProject.create({ ...req.body })
    res.json({success: true,userProject: result})
})

export default RouterI