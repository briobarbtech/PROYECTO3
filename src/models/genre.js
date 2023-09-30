import connection from "../services/connection.js";
import { DataTypes } from "sequelize";

const db = connection.connection;

const Genre = db.define('Genre', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    genreName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { tableName: 'genre', timestamps: false })

export default Genre;