import connection from "../services/connection.js";
import { DataTypes } from "sequelize";

const db = connection.connection;

const movie_actor = db.define('movie_actor', {
    movieID: {
        type: DataTypes.INTEGER
    },
    actorID: {
        type: DataTypes.INTEGER
    }
}, { tableName: 'movie_actor', timestamps: false })

export default movie_actor;