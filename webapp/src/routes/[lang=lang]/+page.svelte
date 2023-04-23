<script>
	import { goto, invalidateAll } from '$app/navigation';
	import LL from '$i18n/i18n-svelte';

	console.info($LL.log({ fileName: '+page.svelte' }));

</script>
<div class="main">

</div>

<div class="m-5 p-2 text-center">
<h1 class="text-5xl font-extralight p-4 ">NOAA 3D Volcanoes Viewer</h1>
<h2 class="text-2xl font-extralight">Start Exploring...</h2>
<a rel="external" href="/earth">
    <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm
px-5 py-2.5 text-center mr-2 mb-2">Explore</button>
</a>
</div>