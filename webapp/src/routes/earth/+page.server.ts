import {SECRET_DATABASE, SECRET_PASSWORD, SECRET_SERVER, SECRET_USER} from "$env/static/private";

export const ssr = false;

import type { PageServerLoad } from './$types';

import sql from 'mssql';

export const load = (async ({ params }) => {
    let result;
    try {
        // make sure that any items are correctly URL encoded in the connection string

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
        await sql.connect(sqlConfig)
        result = await sql.query`select 
items_name, items_location, items_country, items_latitude, items_longitude, items_elevation, items_morphology, items_vei 
from dbo.volcanoes`
        console.dir(result)
    } catch (err) {
        //console.log(err)
    }

    return {
        test: result.recordset
    };
}) satisfies PageServerLoad;