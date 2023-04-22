import type {RequestHandler} from "@sveltejs/kit";
import sql from "mssql";

export const GET: RequestHandler = async (event) => {

    const result = await sql.query`select DISTINCT items_country from dbo.volcanoes`

    return new Response(JSON.stringify(result.recordset))
}
