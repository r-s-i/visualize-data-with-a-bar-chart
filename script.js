d3.select("body")
  .append("h1")
  .text("United States GDP, 1947-2015")
  .attr("id", "title");

// Canvas:
let svg = d3
  .select("body")
  .append("svg")
  .attr("width", 700)
  .attr("height", 500);

// x-axis:
let xScale = d3
  .scaleLinear()
  .range([0, 275 * 2])
  .domain([0, 275]);
let xAxis = d3.axisBottom(xScale).ticks(10);

svg
  .append("g")
  .attr("transform", "translate(60," + 470 + ")")
  .attr("id", "x-axis")
  .call(xAxis);

// y-axis:
let yScale = d3.scaleLinear().range([400, 0]).domain([0, 20000]);
let yAxis = d3.axisLeft(yScale).ticks(10);

svg
  .append("g")
  .attr("transform", "translate(60, 70)")
  .attr("id", "y-axis")
  .call(yAxis);

fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then((r) => r.json())
  .then((d) => {
    console.log(d["data"]);
    // Main code goes here
    const data = d["data"];
    // Data bars:
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1])
      .attr("x", (d, i) => 62 + i * 2)
      .attr("y", (d, i) => 470 - d[1] * 0.02)
      .attr("width", 1)
      .attr("height", (d) => d[1] * 0.02)
      .style("fill", "black");
  })
  .catch((e) => console.error(e));
