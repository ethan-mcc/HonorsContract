import type { LayoutServerData } from './$types';
import {connectToDB} from "../lib/utils/db";

export const load = (async ({ locals: { locale, LL } }) => {
	//console.info(LL.log({ fileName: '+layout.server.ts' }));
	// pass locale information from "server-context" to "shared server + client context"
	await connectToDB()
	return { locale };
}) satisfies LayoutServerData;
