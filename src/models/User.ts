import Sequelize, { Model } from "sequelize"
import sequelize from "../config/database"

const User: any = sequelize.define("users",{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email: {
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    imgName:{
        type:Sequelize.STRING,
        allowNull:true
    },
    imgUrl:{
        type:Sequelize.STRING,
        allowNull:true
    }
})

export default User;