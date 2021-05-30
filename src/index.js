import { drawRectangle, drawCircle } from "./simulation";
import "./index.scss";

export function runSim() {
  const canvas = document.getElementById("simulator-canvas");
  const context = canvas.getContext("2d");

  const stateJson = JSON.parse(document.getElementById("state-json").value);

  const fixedObjects = Object.entries(stateJson.objects).filter(
    ([name, props]) => props.motion === "fixed"
  );

  const numberOfFrames = stateJson.timeseries.length;
  let index = 0;
  const step = (timestamp) => {
    drawSimulation(context, stateJson, index);
    index += 1;

    if (index !== numberOfFrames) {
      requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

function drawSimulation(context, stateJson, index) {
  const state = stateJson.timeseries[index];
  context.clearRect(
    0,
    0,
    context.canvas.clientWidth,
    context.canvas.clientHeight
  );
  Object.entries(stateJson.objects).forEach(([objectName, objectMetadata]) => {
    const objectState = state[objectName];
    const objectInfo = { name: objectName, ...objectMetadata, ...objectState };
    drawObject(objectInfo, context);
  });
}

function drawObject(objectInfo, context) {
  const shape = objectInfo.shape;
  if (shape === "circle") {
    drawCircle(objectInfo, context);
  } else if (shape === "rectangle") {
    drawRectangle(objectInfo, context);
  } else {
    const errorMessage = `Error: Shape ${shape} not defined`;
    alert(errorMessage);
    throw errorMessage;
  }
}

function main() {
  const fileTags = document.querySelectorAll(".tile-list > li > a");
  console.log(fileTags);
  fileTags.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      alert(e.target.innerText);
    });
  });
}

async function getSimulationFiles() {
    const files = await fetch('/simulations/')
}

function createFileTile() {

}