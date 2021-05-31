import { drawRectangle, drawCircle } from "./simulation";
import "./index.scss";

let simulationAnimationId = 0;

function runSim(stateJson) {
  const canvas = document.getElementById("simulator-canvas");

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const context = canvas.getContext("2d");

  const numberOfFrames = stateJson.timeseries.length;
  let index = 0;
  const step = (timestamp) => {
    drawSimulation(context, stateJson, index);
    index += 1;

    if (index !== numberOfFrames) {
      simulationAnimationId = requestAnimationFrame(step);
    }
  };

  window.cancelAnimationFrame(simulationAnimationId);
  simulationAnimationId = window.requestAnimationFrame(step);
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

async function main() {
  const simulationFileList = document.getElementById('simulation-file-list');

  const simulationResponse = await getSimulationFiles();
  const simulations = JSON.parse(simulationResponse).results;

  simulations.forEach((simulationName) => {
    const fileTile = createFileTile(simulationName);
    fileTile.addEventListener('click', () => {
      const fileName = fileTile.innerText;
      getSimulationData(fileName)
        .then((simulationData) => {
          runSim(JSON.parse(simulationData));
        });

    });

    simulationFileList.appendChild(fileTile);
  })
}

async function getSimulationFiles() {
    const filesResponse = await fetch('/getsimulations');
    if (filesResponse.ok) {

      return filesResponse.text();
    }
}

function createFileTile(simulationName) {
  const template = document.getElementById('simulation-file');
  const templateClone = template.content.cloneNode(true);

  const listItem = templateClone.querySelector('li');

  const aTag = listItem.querySelector('a');
  aTag.innerText = simulationName;

  return listItem;
}

async function getSimulationData(simulationName) {
  const filesResponse = await fetch(`simulation/${simulationName}`);
  if (filesResponse.ok) {
    return filesResponse.json();
  }
}

main();