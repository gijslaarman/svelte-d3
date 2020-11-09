<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import getHexColor from "../scripts/getHexColor";

  export let data;
  const carData = data.data;

  let x,
    y,
    bars = [];

  function handleClick(event, d) {
    const target = d3.select(event.currentTarget);
    const fill = target.attr("fill");

    d3.select(event.currentTarget).attr(
      "fill",
      fill === "red" ? "black" : "red"
    );
  }
  // set the ranges
  const width = 960;
  const height = 480;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  // Wait for the element svg to mount so that we can call it with d3.
  onMount(() => {
    const axis = d3.select("svg g");

    const name = "kenteken";
    const value = "aantal_cilinders";

    bars = carData.map((d) => {
      return {
        ...d,
        name: d[name],
        value: Number(d[value]) || 0,
      };
    });

    // X & Y axis are really hard to make with HTML elements, and D3 is very good at making this. So let's not change anything about this :).
    x = d3.scaleBand().range([0, width]).padding(0.01);
    y = d3.scaleLinear().range([height, 0]);

    // Scale the range of the data in the domains
    x.domain(carData.map((d) => d[name]));
    y.domain([0, d3.max(carData, (d) => d[value])]);

    // add the x Axis
    axis
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // add the y Axis
    axis.append("g").call(d3.axisLeft(y));
  });
</script>

<svg
  width={width + margin.left + margin.right}
  height={height + margin.top + margin.bottom}>
  <g transform="translate({margin.left},{margin.top})">
    {#each bars as { name, value }}
      <rect
        class="bar"
        width={x.bandwidth()}
        height={height - y(value)}
        x={x(name)}
        y={y(value)}
        on:click={handleClick} />
    {:else}
      <p>creating bars..</p>
    {/each}
  </g>
</svg>
