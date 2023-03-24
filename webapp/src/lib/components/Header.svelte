<script lang="ts">
	import { locale } from '$i18n/i18n-svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
</script>

<header>
	<a href="/{$locale}">
		<h1>Home</h1>
	</a>

	<ThemeSwitcher />
</header>
