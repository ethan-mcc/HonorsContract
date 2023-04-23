import type {RequestHandler} from "@sveltejs/kit";
import sql from "mssql";

export const GET: RequestHandler = async (query) => {

    const SQLquery = `USE master
        EXEC dbo.Countries`
    const result = await sql.query(SQLquery)

    return new Response(JSON.stringify(result.recordset))
}
