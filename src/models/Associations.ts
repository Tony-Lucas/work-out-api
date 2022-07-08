import sequelize from "../config/database"
import User from "./User"
import Task from "./Task"
import Project from "./Project"
import ProjectTask from "./ProjectTask"
import UserProject from "./UserProject"
import Notification from "./Notification"
import ProjectInvite from "./ProjectInvite"

// 1 to n
User.hasMany(Task)
Task.belongsTo(User)

// n to n
User.belongsToMany(Project,{through: UserProject})
Project.belongsToMany(User,{through: UserProject})

// 1 to n
Project.hasMany(ProjectTask)
ProjectTask.belongsTo(Project)

// 1 to n
User.hasMany(Notification)
Notification.belongsTo(User)

// 1 to n
User.hasMany(ProjectInvite)
ProjectInvite.belongsTo(User)


sequelize.sync({force:false})

