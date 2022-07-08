import Sequelize, { Model } from "sequelize"
import sequelize from "../config/database"

const Notification: any = sequelize.define("notification",{
    type:{
        type:Sequelize.ENUM("Invite","Inform"),
        allowNull:false
    },
    message:{
        type:Sequelize.STRING,
        allowNull:false
    },
    visualized:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: false
    }
})

export default Notification