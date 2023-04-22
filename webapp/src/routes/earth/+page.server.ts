import {SECRET_DATABASE, SECRET_PASSWORD, SECRET_SERVER, SECRET_USER} from "$env/static/private";

export const ssr = false;

import type { PageServerLoad } from './$types';

import sql, {connect} from 'mssql';
import {locales} from "../../i18n/i18n-util";
import {connectToDB} from "../../lib/utils/db";

export const load = (async ({ params }) => {

}) satisfies PageServerLoad;

