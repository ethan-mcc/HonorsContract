<script>
    import Globe from 'globe.gl';

    import {scaleLinear} from "d3-scale";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import * as d3 from "d3-scale";

    let searchBox;

    function openSearch() {
        searchBox = true;
    }

    function closeSearch() {
        searchBox = false;
    }

    export let data
    console.log(data.test)


    async function getV() {

        const response = await fetch('/api/v', {
            method: 'GET'
        });
        if (response.ok) {
            return response.text()
        }
    }

    async function postV(event) {
        const data = new FormData(this);

        const response = await fetch('/api/v', {
            method: 'POST',
            body: data
        });
        if (response.ok) {
            console.log(response.text())
            return response.text()

        }
    }

    async function changeData(data) {
        myGlobe.hexBinPointsData(JSON.parse(data));
    }

    let myGlobe;

    onMount(async () => {

        const weightColor = d3.scaleLinear()
            .domain([0, 30])
            .range(['lightblue', 'darkred'])
            .clamp(true);

        myGlobe = Globe()
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
            .hexBinPointLat(d => d.items_latitude)
            .hexBinPointLng(d => d.items_longitude)
            //.hexBinPointWeight(d => d.properties.mag)
            .hexAltitude(({ sumWeight }) => sumWeight * 0.005)
            .hexTopColor(d => weightColor(d.sumWeight))
            .hexSideColor(d => weightColor(d.sumWeight))
            .hexLabel(d => `
        <b>${d.points.slice().map(d=> d.items_location).at(0)}</b> ${d.points.length} events recorded<ul><li>
          ${d.points.slice().sort((a, b) => b.items_year - a.items_vei).map(d => d.items_name + ' ' + d.items_year).join('</li><li>')}
        </li></ul>
      `)
            (document.getElementById('globeViz'));

        //console.log(data.test.recordset)


        myGlobe.hexBinPointsData(JSON.parse(await getV()));



        //console.log(data.test.recordset[0].items_latitude)


    });


</script>
<head>
    <style> body { margin: 0; } </style>


    <!--<script src="../../dist/globe.gl.js"></script>-->
</head>

<body>
    <button on:click={() => openSearch()}
            class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example"
            aria-controls="drawer-example">
        Filters
    </button>
<!-- drawer component -->
{#if searchBox}
<form method="post" id="drawer-example" on:submit|preventDefault={async () => await changeData(postV())}
      class="fixed top-0 left-0 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform z-10 bg-white dark:bg-gray-800"
      tabindex="-1" aria-labelledby="drawer-label">
    <h5 id="drawer-label"
        class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
        Apply filters
    </h5>
    <button on:click={() => closeSearch()} type="button" data-drawer-dismiss="drawer-example" aria-controls="drawer-example"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
        <svg aria-hidden="false" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
             xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
        </svg>
        <span class="sr-only">Close menu</span>
    </button>

    <div class="flex flex-col justify-between flex-1">
        <div class="space-y-6">
            <!-- Categories -->

            <!-- Prices -->
            <div class="space-y-2">
                <h6 class="text-base font-medium text-black dark:text-white">
                    Year
                </h6>
                <div class="flex items-center justify-between col-span-2 space-x-3">
                    <div class="w-full">


                        <input type="number" name="year-from" id="year-from" value="1000" min="1" max="2023"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                               placeholder="" required>
                    </div>

                    <div class="w-full">


                        <input type="number" name="year-to" id="year-to" value="2023" min="1" max="2023"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                               placeholder="" required>
                    </div>
                </div>
            </div>

        </div>

        <div class="bottom-0 left-0 flex justify-center w-full pb-4 mt-6 space-x-4 md:px-4 md:absolute">
            <button type="submit"
                    class="w-full px-5 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-700 dark:hover:bg-primary-800 dark:focus:ring-primary-800">
                Apply filters
            </button>
            <button type="reset"
                    class="w-full px-5 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Clear all
            </button>
        </div>
    </div>
</form>
{/if}

<div id="globeViz"></div>
</body>