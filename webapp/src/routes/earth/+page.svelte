<script>
    import Globe from 'globe.gl';
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";



    import {scaleLinear} from "d3-scale";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import * as d3 from "d3-scale";
    import {goto} from "$app/navigation";
    import { fade, slide } from 'svelte/transition';
    import {TextureLoader} from "three";
    import * as THREE from "three";


    let searchBox;
    let showTable;

    function openSearch() {
        searchBox = true;
    }

    function closeSearch() {
        searchBox = false;
    }

    export let data
    console.log(data.test)


    async function getV() {

        const response = await fetch('/api/v/?t=', {
            method: 'GET'
        });
        if (response.ok) {
            return response.text()
        }
    }

    async function getC() {

        const response = await fetch('/api/c/?t=', {
            method: 'GET'
        });
        if (response.ok) {
            return response.text()
        }
    }

    let countriesElement = [];

    async function postV() {
        const data = new FormData(this);
        data.append("countries", countriesElement)
        const response = await fetch('/api/v', {
            method: 'POST',
            body: data
        }).then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status
        }))
            .then(res => {
                console.log(res.status, res.data)
                changeData(res.data)
            }))

    }

    async function changeData(data) {
        myGlobe.hexBinPointsData(data);
    }

    let loaded = false;
    let finished = false;
    async function changeImage(data) {
        if (!loaded && data.altitude < 1.25){
            loaded = true
            myGlobe.globeImageUrl("/images/earth-min.jpg")
        }
        else if (data.altitude < 1.19) {
            finished = true;
        }
    }

    let myGlobe;
    let dbData;
    let countries;

    function clickedHex(data) {
        goto("earth/" + data.points[0].items_name)
    }
    onMount(async () => {
        countries = JSON.parse(await getC())

        const weightColor = d3.scaleLinear()
            .domain([0, 30])
            .range(['lightblue', 'darkred'])
            .clamp(true);

        myGlobe = Globe({animateIn: false})
            //images/earth.jpg

            .globeImageUrl("/images/fast_earth.jpg")
            .backgroundImageUrl("/images/galaxy_starfield.png")
            .bumpImageUrl('/images/earth-topology.png')
            .hexBinPointLat(d => d.items_latitude)
            .hexBinPointLng(d => d.items_longitude)
            //.hexBinPointWeight(d => d.properties.mag)
            .hexAltitude(({ sumWeight }) => sumWeight * 0.009)
            .hexTopColor(d => weightColor(d.sumWeight))
            .hexSideColor(d => weightColor(d.sumWeight))
            .hexTransitionDuration(100)
            .onHexClick(clickedHex)
            .onZoom(changeImage)
            .hexBinPointsData(JSON.parse(await getV()))
            .hexLabel(d=> `<a href={"earth/" + data.points[0].items_name}>
    <div class="relative w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="p-2 text-black dark:text-white">
        <ul>
            <b>${d.points.slice().map(d=> d.items_country).at(0)} - ${d.points.slice().map(d=> d.items_name).at(0)}</b><br>
            <b>Elevation: ${d.points.slice().map(d=> d.items_elevation).at(0)}m</b><br>
            <b>(${d.points.slice().map(d=> d.items_morphology).at(0)})</b><br>
            <b>(${d.points.slice().map(d=> d.items_latitude).at(0)}, ${d.points.slice().map(d=> d.items_longitude).at(0)})</b><br>
            <li>${d.points.length} events recorded</li>
        </ul>
        </div>
    </div>
</div></a>`)
                // This is very important.
            (document.getElementById('globeViz'));

        const CLOUDS_IMG_URL = '/images/clouds.png';
        const CLOUDS_ALT = 0.004;
        const CLOUDS_ROTATION_SPEED = -0.003; // deg/frame

        new TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
            const clouds = new THREE.Mesh(
                new THREE.SphereGeometry(myGlobe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
                new THREE.MeshPhongMaterial({map: cloudsTexture, transparent: true})
            );
            myGlobe.scene().add(clouds);

            (function rotateClouds() {
                clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
                requestAnimationFrame(rotateClouds);
            })();
        });

        //dbData = JSON.parse(await getV())
        //await changeImage()
    });


</script>
<head>
    <style> body { margin: 0; } </style>


    <!--<script src="../../dist/globe.gl.js"></script>-->
</head>

<body data-sveltekit-preload-data="hover">

    <button on:click={() => openSearch()}
            class="relative inline-flex items-center justify-center mt-2 p-0.5 mb-2 mr-2 ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Filters
  </span>
    </button>
    <h1 class="inline-flex {loaded && !finished ? '' : 'hidden'}" transition:fade={{duration: 100}}>Loading High-Res Globe...</h1>
<!-- drawer component -->
{#if searchBox}
<form method="post" id="drawer-example" on:submit|preventDefault={postV} transition:slide
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
            <!-- Year -->
            <div class="space-y-2">
                <h6 class="text-base font-medium text-black dark:text-white">
                    Year
                </h6>
                <div class="flex items-center justify-between col-span-2 space-x-3">
                    <div class="w-full">


                        <input type="number" name="year-from" id="year-from" value="-1000" min="-1000" max="2023"
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

            <div class="space-y-2">
                <h6 class="text-base font-medium text-black dark:text-white">
                    Country
                </h6>
                <div class="flex items-center justify-between col-span-2 space-x-3">
                    <div class="w-full">
                        <select multiple bind:value={countriesElement} id="country" name="country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option selected>Choose a country</option>
                            {#each countries as {items_country}}
                            <option value="{items_country}">{items_country}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>

            <div class="space-y-2">
                <h6 class="text-base font-medium text-black dark:text-white">
                    VEI
                </h6>
                <div class="flex items-center justify-between col-span-2 space-x-3">
                    <div class="w-full">
                        <input id="vei" name="vei" type="range" min="0" max="5" value="1" step="1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">

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


<div id="globeViz">
</div>
</body>