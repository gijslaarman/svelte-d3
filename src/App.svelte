<script>
  import fetchData from "../scripts/fetchCarData";
  import mockUpData from "../scripts/getMockUpData";
  import Graph from "./Graph.svelte";

  const data = mockUpData();
</script>

<main>
  {#await data}
    <p>Awaiting data..</p>
  {:then carData}
    <Graph data={carData} />
  {/await}
</main>
