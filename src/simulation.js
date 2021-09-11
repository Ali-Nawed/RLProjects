export function drawRectangle(objectInfo, context) {
  const dimX = objectInfo.dim_x;
  const dimY = objectInfo.dim_y;
  const posX = objectInfo.pos_x;
  const posY = objectInfo.pos_y;

  const bottomLeftX = posX - dimX / 1.0;
  const bottomLeftY = posY - dimY / 1.0;

  const rectWidth = scaleDimToCanvasWidth(dimX, context);
  const rectHeight = scaleDimToCanvasHeight(dimY, context);

  const rectStartX = scalePositionToCanvasWidth(bottomLeftX, context);
  const rectStartY = scalePositionToCanvasHeight(bottomLeftY, context);

  context.fillStyle = nameToColor(objectInfo.name);
  context.fillRect(rectStartX, rectStartY, rectWidth, rectHeight);
}

export function drawCircle(objectInfo, context) {
  const posX = scalePositionToCanvasWidth(objectInfo.pos_x, context);
  const posY = scalePositionToCanvasHeight(objectInfo.pos_y, context);
  const radius = objectInfo.radius;
  const canvas = context.canvas;

  context.beginPath();
  // Scale the circle to an ellipse of the ratio of canvas width and height isn't 1:1
  if (canvas.clientWidth === canvas.clientHeight) {
    context.arc(posX, posY, scaleDimToCanvasHeight(radius, context), 0, 2 * Math.PI);
  } else {
    console.log(`Circle converted to ellipse due to dispropotional viewport: [${canvas.clientWidth}, ${canvas.clientHeight}]`);
    context.ellipse(posX, posY, scaleDimToCanvasWidth(radius, context), scaleDimToCanvasHeight(radius, context), 0, 0, 2 * Math.PI);
  }  
  
  context.fillStyle = nameToColor(objectInfo.name);
  context.fill();
  context.stroke();
}

// holds the computed names to color map
const nameToColorMapping = { }

function nameToColor(name) {
  if (nameToColorMapping[name]) {
    return nameToColorMapping[name];
  } else {
    const color = '#' + Math.floor(Math.random()*16777215).toString(16);
    nameToColorMapping[name] = color;
    return color;
  }
}

function scalePositionToCanvasWidth(value, context) {
  return Math.round(((value + 1) * context.canvas.clientWidth) / 2);
}

function scalePositionToCanvasHeight(value, context) {
  return Math.round(((value + 1) * context.canvas.clientHeight) / 2);
}

function scaleDimToCanvasWidth(value, context) {
  return Math.round(value * context.canvas.clientWidth);
}

function scaleDimToCanvasHeight(value, context) {
  return Math.round(value * context.canvas.clientHeight);
}
