import Sequelize, { Model } from "sequelize"
import sequelize from "../config/database"

const Project: any = sequelize.define("projects",{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    admId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

export default Project