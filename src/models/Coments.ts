import Sequelize, { Model } from "sequelize"
import sequelize from "../config/database"

const Coments: any = sequelize.define("coments",{
    text:{
        type:Sequelize.STRING,
        allowNull:false
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

export default Coments