import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let svg;

const width = 800;
const height = 600;
const maxCircles = 10;
const circleRadius = 15;

async function prepareVis() {
  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "#f8f8f8")
    .style("border", "1px solid #ccc")
    .style("cursor", "crosshair");

  svg.on("click", handleCanvasClick);

  updateStatus();
}

function handleCanvasClick(event) {
  const currentCount = svg.selectAll("circle").size();

  if (currentCount >= maxCircles) {
    return;
  }

  const [x, y] = d3.pointer(event, svg.node());

  svg
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 0)
    .attr("fill", "black")
    .attr("opacity", 0.85)
    .transition()
    .duration(250)
    .attr("r", circleRadius);

  updateStatus();
}

function updateStatus() {
  const count = svg ? svg.selectAll("circle").size() : 0;
  const status = document.querySelector("#status");

  if (status) {
    status.textContent = `Circles: ${count} / ${maxCircles}`;
  }
}

async function runApp() {
  await prepareVis();
}

runApp();