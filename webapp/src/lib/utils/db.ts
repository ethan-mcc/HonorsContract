import {SECRET_DATABASE, SECRET_PASSWORD, SECRET_SERVER, SECRET_USER} from "$env/static/private";
import sql, {pool} from "mssql";

const sqlConfig = {
    user: SECRET_USER,
    password: SECRET_PASSWORD,
    database: SECRET_DATABASE,
    server: SECRET_SERVER,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

export const connectToDB = async () => await sql.connect(sqlConfig)
