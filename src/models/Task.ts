import Sequelize, { Model } from "sequelize"
import sequelize from "../config/database"

const Task: any = sequelize.define("tasks", {
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
    }
}, { timestamps: true })

export default Task;