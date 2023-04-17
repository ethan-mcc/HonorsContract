<script>
    import Globe from 'globe.gl';

    import {scaleLinear} from "d3-scale";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import * as d3 from "d3-scale";

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


    onMount(async () => {

        const weightColor = d3.scaleLinear()
            .domain([0, 30])
            .range(['lightblue', 'darkred'])
            .clamp(true);

        const myGlobe = Globe()
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
            .hexBinPointLat(d => d.items_latitude)
            .hexBinPointLng(d => d.items_longitude)
            //.hexBinPointWeight(d => d.properties.mag)
            .hexAltitude(({ sumWeight }) => sumWeight * 0.0035)
            .hexTopColor(d => weightColor(d.sumWeight))
            .hexSideColor(d => weightColor(d.sumWeight))
            .hexLabel(d => `
        <b>${d.points.length}</b> earthquakes in the past month:<ul><li>
          ${d.points.slice().sort((a, b) => b.items_vei - a.items_vei).map(d => d.items_name).join('</li><li>')}
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
<div id="globeViz"></div>
</body>