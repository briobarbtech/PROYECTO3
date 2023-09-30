import connection from "../services/connection.js";
import { DataTypes } from "sequelize";

const db = connection.connection;

const Movie =  db.define('Movie', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },categoryID:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        season: {
            type: DataTypes.INTEGER
        }

    }, { tableName: 'movie', timestamps: false })


export default Movie;