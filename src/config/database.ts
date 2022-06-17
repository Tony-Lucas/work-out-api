import { query } from "express";
import { Sequelize } from "sequelize"

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    query: {
        raw: true
    }
})

export default sequelize;