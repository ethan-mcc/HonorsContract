import type { json, RequestHandler } from '@sveltejs/kit'
import {connectToDB} from "../../../lib/utils/db";
import sql, {columns} from "mssql";


// Custom API EndPoint
export const GET: RequestHandler = async (query) => {

    // Using a stored procedure decreased average latency by ~5-25ms.
    const SQLquery = `USE master
                   EXEC dbo.BaseVolcanoes`

    const result = await sql.query(SQLquery)

    return new Response(JSON.stringify(result.recordset))
}

export const POST: RequestHandler = async ({request}) => {
    const form = await request.formData();
    const year_from = form.get('year-from');
    const year_to = form.get('year-to');
    const vei = form.get('vei')
    const countries = form.get('countries')?.toString()

    // Stored Procedure FilterVolcanoes cut latency in half to 50-80ms. :)
    const query = `USE master
                    EXEC dbo.FilterVolcanoes
                    @year_from = '${year_from}',
                    @year_to = '${year_to}',
                    @vei = '${vei}',
                    @countries = '${countries}'`
    const result = await sql.query(query)
    return new Response(JSON.stringify(result.recordset))
}


