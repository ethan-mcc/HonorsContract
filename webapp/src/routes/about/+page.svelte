<script>
  import {page} from "$app/stores";

  export let data = $page.data.post
  console.log(data.test.recordsets)
</script>
<body>
<!-- drawer init and toggle -->
<div class="container mx-auto w-1/2">
<div class="m-5 p-2 text-center m-5">
    <div class="p-2">
        <h1 class="font-semibold text-2xl">Goal</h1>
        <p>Having never really built a Web Application, Full Stack, the idea here was to implement an SQL Server like it
        would be done in the real world. The goal was explore outside of the scope of the classroom, and figure how it's
        done. But, without just doing something similar to the Final Project, as some sort of replication, something completely different.</p>
    </div>
    <hr>
    <div class="p-2">
        <h1 class="font-semibold text-2xl">Database</h1>
        <p>The database is SQL Server, but is a docker container variation. This is a container by Microsoft called
            <a href="https://hub.docker.com/_/microsoft-azure-sql-edge" class="text-blue-400 hover:text-blue-300">Azure SQL Edge</a>, its more secure, and runs in Linux.
        It is the same as SQL Server, I use environment variables on the Web application side (Server Side only).</p>
    </div>
    <hr>
    <div class="p-2">
        <h1 class="font-semibold text-2xl">Hosting</h1>
        <p>The Database is run inside of a Ubuntu VM Server, hosted by HostHatch. It is 4 vCPU and 12GB of RAM,
            that is 1 dedicated core, and 3 fair share. The API only has access to the docker container, inside of the Linux Virtual Machine.</p>
    </div>
    <hr>
    <div class="p-2">
        <h1 class="font-semibold text-2xl">Webapp</h1>
        <p>The Web Application is SvelteKit, which is absolute state of art framework. The API and Actions and hosted Server-Side, only the Web Application.
        The client doesn't have direct access to the SQL Server, can only GET and POST formulated queries through the Web Applcation through stored procedures on the SQL Server.
        The application is both Serve-Side Rendered and Client Side Rendered, making this very fast, and super efficient.</p>
    </div>
    <hr>
    <div class="p-2">
        <h1 class="font-semibold text-2xl">Globe</h1>
        <p>At first I started building my own globe rendering, but that is obviously going to take a long time. I went with Globe.GL wrapper
        built on Three.js a 3D rendering Javascript Framework. </p>
    </div>
    <hr>
    <div class="p-2">
        <h1 class="font-semibold text-2xl">Site Visuals</h1>
        <p>Using TailwindCSS Framework, zero unused CSS.</p>
    </div>
    <hr>
    <div class="p-2">
        <h1 class="font-semibold text-2xl">Data</h1>
        <p>The Database is scrapped from NOAA, ~800 rows, and queried Server-Side in the Web application.
            The information is partially filtered as a JSON Object, (Query -> Filter -> Render) as this is the
            lowest latency on a Web Application. Web Application Latency 20-40ms, SQL Server ~50-150ms, Render 20-40ms</p>
    </div>
    <hr>
    <div class="p-2">
        <h1 class="font-semibold text-2xl">API</h1>
        <p>All of the pages are written in Typescript, form actions, and requests are done on the Web Application Server,
            the API then interfaces with the SQL Server through stored procedures.</p>
        <b>Request Flow: (Client -> API -> Web Server -> Linux VM -> Docker -> Azure SQL Edge -> Stored Procedure)</b><br>
        <b>Response Flow: (Azure SQL Edge -> Docker -> Linux VM -> Web Server -> API Response -> Client)</b><br>
        <hr>
        <b>Routes</b>
        <ul>
            <li>
                <div class="inline-flex text-blue-400 hover:text-blue-300">/c</div> - Countries data
            </li>
            <li>
                <div class="inline-flex text-blue-400 hover:text-blue-300">/bc</div> - ByCity: City parameter, all rows in that City.
            </li>
            <li>
                <div class="inline-flex text-blue-400 hover:text-blue-300">/v</div> - Volcanoes (GET: <b>BaseVolcanoes Stored Procedure</b>)
                (POST: <b>FilterVolcanoes Stored Procedure</b> Params: country, vei, start and end year.)
            </li>
        </ul>
    </div>
</div>
</div>

<!-- drawer component -->
</body>