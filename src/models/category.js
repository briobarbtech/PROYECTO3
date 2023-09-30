import connection from "../services/connection.js";
import { DataTypes } from "sequelize";

const db = connection.connection;

const Category = db.define('Category', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { tableName: 'category', timestamps: false })

export default Category;