// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import sql from "mssql";

type Locales = import('$i18n/i18n-types').Locales;
type TranslationFunctions = import('$i18n/i18n-types').TranslationFunctions;

declare namespace App {
	// interface Error {}
	interface Locals {
		locale: Locales;
		LL: TranslationFunctions;
		dbconn: sql;
	}
	// interface PageData {}
	// interface Platform {}
}

declare module '*.svg?component' {
	import type { ComponentType, SvelteComponentTyped } from 'svelte';
	import type { SVGAttributes } from 'svelte/elements';

	const content: ComponentType<SvelteComponentTyped<SVGAttributes<SVGSVGElement>>>;

	export default content;
}

declare module '*.svg?src' {
	const content: string;
	export default content;
}

declare module '*.svg?url' {
	const content: string;
	export default content;
}

declare module '*.svg?dataurl' {
	const content: string;
	export default content;
}
