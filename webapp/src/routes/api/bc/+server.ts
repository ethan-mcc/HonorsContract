import type { json, RequestHandler } from '@sveltejs/kit'
import {connectToDB} from "../../../lib/utils/db";
import sql from "mssql";


// Custom API EndPoint
export const GET: RequestHandler = async (query) => {
    const city = Array.from(query.url.searchParams.entries())[0][1]
    // Using a stored procedure decreased average latency by ~5-25ms.
    const SQLquery = `USE master
                   EXEC dbo.ByCity
                   @city = '${city}'`

    const result = await sql.query(SQLquery)

    return new Response(JSON.stringify(result.recordset))
}


