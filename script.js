d3.select("body")
  .append("h1")
  .text("United States GDP, 1947-2015")
  .attr("id", "title");
const canvasWidth = "100%";
const canvasHeight = "100%";

// Canvas:
let svg = d3
  .select("body")
  .append("svg")
  .attr("width", canvasWidth)
  .attr("height", canvasHeight);

const width = d3.select("body").node().getBoundingClientRect().width;
const height = d3.select("body").node().getBoundingClientRect().height;

// Offsets:
const yOffset = 60;
const xOffset = width * 0.15;

// x-axis:
let xScale = d3
  .scaleTime()
  .range([0, width * 0.7])
  .domain([new Date(1947, 0, 1), new Date(2015, 9, 1)]);

let xAxis = d3.axisBottom(xScale).ticks(10);

svg
  .append("g")
  .attr("transform", `translate(${xOffset}, ${height / 2 + yOffset})`)
  .attr("id", "x-axis")
  .call(xAxis);

// y-axis:
let yScale = d3
  .scaleLinear()
  .range([height * 0.5, 0])
  .domain([0, 20000]);
let yAxis = d3.axisLeft(yScale).ticks(10);

svg
  .append("g")
  .attr("transform", `translate(${xOffset}, ${yOffset})`)
  .attr("id", "y-axis")
  .call(yAxis);

// Tooltip:
let tooltip = d3.select("body").append("section").attr("id", "tooltip");

fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then((r) => r.json())
  .then((d) => {
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
      .attr("x", (d, i) => xOffset + 1 + i * ((width * 0.7) / 275))
      .attr("y", (d, i) => yScale(d[1]) + yOffset)
      .attr("width", (width * 0.8) / d["data"].length)
      .attr("height", (d) => height / 2 - yScale(d[1]))
      .style("fill", "black")
      .on("mouseover", (d) => {
        d.target.style.fill = "white";
        tooltip.style(
          "left",
          xOffset + Number(d.target.attributes.x.value - 90) + "px"
        );
        tooltip.style("visibility", "visible");
        tooltip.html(
          `Date: ${d.target.__data__[0]} <br> GDP: $${d.target.__data__[1]} Billion`
        );
        tooltip.attr("data-date", d.target.__data__[0]);
      })
      .on("mouseout", (d) => {
        d.target.style.fill = "black";
        tooltip.style("visibility", "hidden");
      });
  })
  .catch((e) => console.error(e));
