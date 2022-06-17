import Sequelize, { Model } from "sequelize"
import sequelize from "../config/database"

const ProjectTask: any = sequelize.define("project_tasks",{
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    priority: {
        type: Sequelize.ENUM("Baixa","Média","Alta"),
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM("To Do","Doing","Done","Review"),
        allowNull: true
    },
    createdBy:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    lastUpdateBy:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
})

export default ProjectTask;