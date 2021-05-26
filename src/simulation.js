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

export function drawCircle(objectState, context) {}

function nameToColor(name) {
  return "red";
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
