import type { json, RequestHandler } from '@sveltejs/kit'
import {connectToDB} from "../../../lib/utils/db";
import sql from "mssql";


// Custom API EndPoint
export const GET: RequestHandler = async (event) => {
    await connectToDB()
    const result = await sql.query`select 
items_name, items_location, items_country, items_latitude, items_longitude, items_elevation, items_morphology, items_vei 
from dbo.volcanoes`

    return new Response(JSON.stringify(result.recordset))
}
