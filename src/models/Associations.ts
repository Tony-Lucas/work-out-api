import sequelize from "../config/database"
import User from "./User"
import Task from "./Task"
import Project from "./Project"
import ProjectTask from "./ProjectTask"
import UserProject from "./UserProject"

// 1 to n
User.hasMany(Task)
Task.belongsTo(User)

// n to n
User.belongsToMany(Project,{through: UserProject})
Project.belongsToMany(User,{through: UserProject})

// 1 to n
Project.hasMany(ProjectTask)
ProjectTask.belongsTo(Project)


sequelize.sync({force:false})

