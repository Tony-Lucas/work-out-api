import Sequelize, { Model } from "sequelize"
import sequelize from "../config/database"

const Project: any = sequelize.define("projects",{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    owner:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

export default Project