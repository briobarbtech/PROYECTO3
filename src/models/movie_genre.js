import connection from "../services/connection.js";
import { DataTypes } from "sequelize";

const db = connection.connection;

const movie_genre = db.define('movie_genre', {
    movieID: {
        type: DataTypes.INTEGER
    },
    genreID: {
        type: DataTypes.INTEGER
    }
}, { tableName: 'movie_genre', timestamps: false })

export default movie_genre;