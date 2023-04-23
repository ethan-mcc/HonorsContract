
<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import {page} from "$app/stores";
    import {onMount} from "svelte";
    import { fade, fly } from 'svelte/transition';


    async function getBC() {

        const response = await fetch('/api/bc/?city=Etna', {
            method: 'GET'
        });
        if (response.ok) {
            return response.text()
        }
    }

    let table: string
    $: table;

    onMount(async () => {

        table = JSON.parse(await getBC())
        console.log(table)
    });
</script>

<head>
    <style> body { margin: 0; } </style>


    <!--<script src="../../dist/globe.gl.js"></script>-->
</head>

<body data-sveltekit-preload-data="hover">
<button on:click={() => history.back()}
        class="relative inline-flex items-center justify-center mt-2 p-0.5 mb-2 mr-2 ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Back
  </span>
</button>
<div class="container mx-auto w-full">
    <h1 class="mx-auto text-center text-2xl p-5">{$page.params.loc}</h1>
<Table shadow hoverable>
    <TableHead>
        <TableHeadCell>Date</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Country</TableHeadCell>
        <TableHeadCell>Latitude</TableHeadCell>
        <TableHeadCell>Longitude</TableHeadCell>
        <TableHeadCell>Elevation</TableHeadCell>
        <TableHeadCell>Morphology</TableHeadCell>
        <TableHeadCell>VEI</TableHeadCell>
        <TableHeadCell>Agent</TableHeadCell>
        <TableHeadCell>Deaths</TableHeadCell>
        <TableHeadCell>Injuries</TableHeadCell>
        <TableHeadCell>Damage ($ mil)</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y" >
        {#if table !== undefined}
        {#each table as {BC, dateEvent, items_name,items_country,
            items_latitude,items_longitude,items_elevation,items_morphology,
            items_vei,items_agent,items_deathsTotal,items_injuriesTotal,
            items_damageMillionsDollarsTotal}}
        <TableBodyRow  class="cursor-pointer">
            {#if BC === 0}
            <TableBodyCell>{new Date (dateEvent).toLocaleDateString()}</TableBodyCell>
            {:else }
                <TableBodyCell>{new Date (dateEvent).toLocaleDateString()} BC</TableBodyCell>
            {/if}
            <TableBodyCell>{items_name}</TableBodyCell>
            <TableBodyCell>{items_country}</TableBodyCell>
            <TableBodyCell>{items_latitude}</TableBodyCell>
            <TableBodyCell>{items_longitude}</TableBodyCell>
            <TableBodyCell>{items_elevation}</TableBodyCell>
            <TableBodyCell>{items_morphology}</TableBodyCell>
            <TableBodyCell>{items_vei}</TableBodyCell>
            <TableBodyCell>{items_agent}</TableBodyCell>
            <TableBodyCell>{items_deathsTotal}</TableBodyCell>
            <TableBodyCell>{items_injuriesTotal}</TableBodyCell>
            <TableBodyCell>{items_damageMillionsDollarsTotal}</TableBodyCell>
        </TableBodyRow>
            {/each}
            {/if}
    </TableBody>
</Table>
</div>
</body>