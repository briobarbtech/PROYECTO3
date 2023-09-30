import connection from "../services/connection.js";
import { DataTypes } from "sequelize";

const db = connection.connection;

const Actor = db.define('Actor', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    actorName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { tableName: 'actor', timestamps: false })


export default Actor;