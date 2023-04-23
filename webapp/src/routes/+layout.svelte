<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import Header from '$lib/components/Header.svelte';
	import HeadHrefLangs from '$lib/components/HeadHrefLangs.svelte';
	import type { LayoutData } from './$types';
	import SvelteTheme from '$lib/components/SvelteThemes/SvelteTheme.svelte';
	export let data: LayoutData;
	console.info($LL.log({ fileName: '+layout.svelte' }));
</script>

<svelte:head>
	<title>{$page.data.title || 'Honors Contract'}</title>
	<HeadHrefLangs />
</svelte:head>

<Header />

<slot />

<SvelteTheme attribute="data-theme" />
