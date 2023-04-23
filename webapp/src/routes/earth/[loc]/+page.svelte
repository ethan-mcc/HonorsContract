
<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import {page} from "$app/stores";
    import {onMount} from "svelte";

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

<body>
<div class="container mx-auto w-full">
<Table shadow hoverable>
    <TableHead>
        <TableHeadCell>Year</TableHeadCell>
        <TableHeadCell>Month</TableHeadCell>
        <TableHeadCell>Count</TableHeadCell>
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
    <TableBody class="divide-y">
        {#if table !== undefined}
        {#each table as {items_year,items_month,items_day,items_tsunamiEventId,
            items_earthquakeEventId,items_volcanoLocationId,
            items_volcanoLocationNewNum,items_volcanoLocationNum,items_name,
            items_location,items_country,items_latitude,items_longitude,
            items_elevation,items_morphology,items_vei,items_agent,
            items_deathsTotal,items_deathsAmountOrderTotal,
            items_damageAmountOrderTotal,items_housesDestroyedTotal,
            items_housesDestroyedAmountOrderTotal,items_significant,
            items_publish,items_status,items_timeErupt,
            items_deathsAmountOrder,items_injuriesTotal,
            items_injuriesAmountOrderTotal,items_damageAmountOrder,
            items_deaths,items_housesDestroyedAmountOrder,
            items_injuries,items_injuriesAmountOrder,items_damageMillionsDollars,
            items_housesDestroyed,items_damageMillionsDollarsTotal,
            items_missing,items_missingAmountOrder,items_missingTotal,
            items_missingAmountOrderTotal}}
        <TableBodyRow  class="cursor-pointer">
            <TableBodyCell>{items_year}</TableBodyCell>
            <TableBodyCell>{items_month}</TableBodyCell>
            <TableBodyCell>{items_day}</TableBodyCell>
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