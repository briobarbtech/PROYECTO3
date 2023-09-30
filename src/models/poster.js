import connection from "../services/connection.js";
import { DataTypes } from "sequelize";

const db = connection.connection;
    const poster = db.define('poster', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        movieID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, { tableName: 'poster', timestamps: false })
export default poster;