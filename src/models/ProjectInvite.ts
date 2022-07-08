import Sequelize, { Model } from "sequelize"
import sequelize from "../config/database"

const ProjectInvite: any = sequelize.define("project_invites",{
    pending:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: false
    },
    receiver:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

export default ProjectInvite