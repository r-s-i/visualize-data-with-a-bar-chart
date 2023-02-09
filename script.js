d3.select("body")
  .append("h1")
  .text("United States GDP, 1947-2015")
  .attr("id", "title");

fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then((r) => r.json())
  .then((d) => {
    console.log(d);
    // Main code goes here
  })
  .catch((e) => console.error(e));
