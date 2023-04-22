import type { json, RequestHandler } from '@sveltejs/kit'
import {connectToDB} from "../../../lib/utils/db";
import sql from "mssql";


// Custom API EndPoint
export const GET: RequestHandler = async (event) => {

    const result = await sql.query`select 
items_name, items_year, items_location, items_country, items_latitude, items_longitude, items_elevation, items_morphology, items_vei 
from dbo.volcanoes`

    return new Response(JSON.stringify(result.recordset))
}

export const POST: RequestHandler = async ({request}) => {
    const form = await request.formData();
    const year_from = form.get('year-from');
    const year_to = form.get('year-to');
    const country = form.get('country')
    const vei = form.get('vei')
    const countries = form.get('countries')?.toString()
    const cut_countries = countries?.split(',').join(', ')

    const query = `select 
items_name, items_year, items_location, items_country, items_latitude, items_longitude, items_elevation, items_morphology, items_vei 
from dbo.volcanoes WHERE items_year > ${year_from} AND items_year < ${year_to} AND items_country IN (${cut_countries}) AND items_vei = ${vei} OR ${vei} IS NULL`
    const result = await sql.query(query)
    return new Response(JSON.stringify(result.recordset))
}


