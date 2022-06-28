import "dotenv/config"
import express from "express"
import "../models/Associations"
import cookieParser from "cookie-parser"

import authRoutes from "../routes/AuthRoutes"
import userRoutes from "../routes/UserRoutes"
import taskRoutes from "../routes/TaskRoutes"
import projectRoutes from "../routes/ProjectRoutes"
import projectTasksRoutes from "../routes/ProjectTasksRoutes"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type', "Cookie", "Set-Cookie");
    res.append('Access-Control-Allow-Credentials', "true")
    res.append('Accept', 'application/json');
    next();
});

app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/task", taskRoutes)
app.use("/project", projectRoutes)
app.use("/project-tasks", projectTasksRoutes)

app.listen(3000, () => {
    console.log(process.env.SECRET_KEY)
})