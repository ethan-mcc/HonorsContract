<script>
  import {page} from "$app/stores";

  export let data = $page.data.post
  console.log(data.test.recordsets)
</script>
<body>
{#each data.test.recordsets[0] as vol}
    {vol.items_name} <br>
{/each}
</body>