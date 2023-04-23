import type { PageServerLoad } from './$types';

import sql from 'mssql';

export const load = (async ({ params }) => {
    let result;
    try {
            // make sure that any items are correctly URL encoded in the connection string

        const sqlConfig = {
            user: 'sa',
            password: '4Zx00bdF0sH',
            database: 'master',
            server: '45.67.219.223',
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            },
            options: {
                encrypt: true, // for azure
                trustServerCertificate: true // change to true for local dev / self-signed certs
            }
        }
        await sql.connect(sqlConfig)
        result = await sql.query`select items_name, items_location, items_country, items_latitude, items_longitude, items_elevation, items_morphology, items_vei from dbo.volcanoes`
            console.dir(result)
        } catch (err) {
            console.log(err)
        }

    return {
        test: result
    };
}) satisfies PageServerLoad;