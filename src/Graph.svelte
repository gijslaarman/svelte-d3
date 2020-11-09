<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import getHexColor from "../scripts/getHexColor";

  export let data;
  const carData = data.data;

  console.log(data);

  // set the ranges
  const width = 960;
  const height = 480;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  // Wait for the element svg to mount so that we can call it with d3.
  onMount(() => {
    const svg = d3
      .select("#graph")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand().range([0, width]).padding(0.01);
    var y = d3.scaleLinear().range([height, 0]);

    const name = "kenteken";
    const value = "aantal_cilinders";

    // Scale the range of the data in the domains
    x.domain(carData.map((d) => d[name]));
    y.domain([0, d3.max(carData, (d) => d[value])]);

    // append the rectangles for the bar chart
    svg
      .selectAll(".bar")
      .data(() =>
        carData.map((d) => {
          const obj = {
            name: d[name],
            value: Number(d[value]) || 0,
          };
          console.log(obj);
          return obj;
        })
      )
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.name))
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => height - y(d.value))
      .on("click", handleClick);

    // add the x Axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g").call(d3.axisLeft(y));

    function handleClick(event, d) {
      const target = d3.select(event.currentTarget);
      const fill = target.attr("fill");

      d3.select(event.currentTarget).attr(
        "fill",
        fill === "red" ? "black" : "red"
      );
    }
  });

  //
  //
  // TESTING

  let bars;
  $: {
    bars = carData.map((car) => {
      return {
        color: getHexColor(car.eerste_kleur || "N.v.t."),
      };
    });
  }
</script>

<div id="graph" />
