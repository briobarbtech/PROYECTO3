import connection from "../services/connection.js";
import { DataTypes } from "sequelize";

const db = await connection.startConnection();

const content = {
    movie: db.define('movie', {
        movieID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryID:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        season: {
            type: DataTypes.INTEGER
        }

    }, { tableName: 'movie', timestamps: false }),

    genre: db.define('genre', {
        genreID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        genreName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, { tableName: 'genre', timestamps: false }),

    movie_genre: db.define('movie_genre', {
        movieID: {
            type: DataTypes.INTEGER
        },
        genreID: {
            type: DataTypes.INTEGER
        }
    }, { tableName: 'movie_genre', timestamps: false }),

    category: db.define('category', {
        categoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, { tableName: 'category', timestamps: false }),

    poster: db.define('poster', {
        posterID: {
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
    }, { tableName: 'poster', timestamps: false }),

    actor: db.define('actor', {
        actorID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        actorName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, { tableName: 'actor', timestamps: false }),


    movie_actor: db.define('movie_actor', {
        movieID: {
            type: DataTypes.INTEGER
        },
        actorID: {
            type: DataTypes.INTEGER
        }
    }, { tableName: 'movie_actor', timestamps: false })
}

export default content;