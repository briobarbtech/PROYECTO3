import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
})
const connection = {
    startConnection: async () => {
        try {
            return await db.authenticate()
                .then(async () => {
                    return await db.sync({force: true}).then(() => {
                        console.log("Connection to DB success!")
                        return db;
                    }).catch(e => {
                        console.log(e.message)
                    })
                })
                .catch(e => {
                    console.log(e.message)
                    throw new Error(e.message)
                });

        } catch (err) {
            console.log("Something went wrong!" + err)
        }
    },
    connection: db,
    closeConnection: async () => {
        try {
            await db.close();
            console.log("Connection closed successfully!")
        } catch (err) {
            console.log("Something went wrong. Connection can't be closed" + err)
        }
    }
}

export default connection;