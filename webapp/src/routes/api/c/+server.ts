import type {RequestHandler} from "@sveltejs/kit";
import sql from "mssql";

export const GET: RequestHandler = async (event) => {

    const query = `USE master
        EXEC dbo.Countries`
    const result = await sql.query(query)

    return new Response(JSON.stringify(result.recordset))
}
