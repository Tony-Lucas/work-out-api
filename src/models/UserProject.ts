import Sequelize, { Model } from "sequelize"
import sequelize from "../config/database"

const UserProject: any = sequelize.define("user_projects",{

},{timestamps:true})

export default UserProject;