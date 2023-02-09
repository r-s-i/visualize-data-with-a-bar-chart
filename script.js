d3.select("body")
  .append("h1")
  .text("United States GDP, 1947-2015")
  .attr("id", "title");

// Canvas:
let svg = d3
  .select("body")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

// x-axis:
let xScale = d3.scaleLinear().range([0, 400]).domain([0, 50]);
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
    console.log(d);
    // Main code goes here
  })
  .catch((e) => console.error(e));
