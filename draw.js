function createGraph(x, y) {
  var ok = true;
  for (var i = 0; i < nodeArray.length; i++) {
    if (checkNodeCollision(nodeArray[i], x, y, size)) {
      ok = false;
      break;
    }
  }
  if (ok) {
    drawCircle(x, y);
    nodeArray.push({ x: x, y: y });
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function redrawStuff() {
  nodeArray.forEach((element) => {
    drawCircle(element.x, element.y);
  });
  lineArray.forEach((element) => {
    drawLine(element.x1, element.y1, element.x2, element.y2);
  });
  textArray.forEach((element) => {
    ctx.font = "30px Arial";
    ctx.fillText(element.text, element.x, element.y);
  });
}

function drawCircle(x, y) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2, true);
  ctx.fill();
}

function connectGraphs(graph) {
  if (
    selectedGraphOne != null &&
    (selectedGraphOne.x != graph.x && selectedGraphOne.y != graph.y)
  ) {
    selectedGraphTwo = graph;
  } else {
    selectedGraphOne = graph;
  }
  if (selectedGraphOne && selectedGraphTwo) {
    var ok = true;
    for (var i = 0; i < lineArray.length; i++) {
      if (
        (selectedGraphOne.x == lineArray[i].x1 &&
          selectedGraphOne.y == lineArray[i].y1 &&
          (selectedGraphTwo.x == lineArray[i].x2 && selectedGraphTwo.y == lineArray[i].y2)) ||
        (selectedGraphOne.x == lineArray[i].x2 &&
          selectedGraphOne.y == lineArray[i].y2 &&
          (selectedGraphTwo.x == lineArray[i].x1 && selectedGraphTwo.y == lineArray[i].y1))
      ) {
        ok = false;
      }
    }
    if (ok) {
      drawLine(selectedGraphOne.x, selectedGraphOne.y, selectedGraphTwo.x, selectedGraphTwo.y);
      lineArray.push({
        x1: selectedGraphOne.x,
        y1: selectedGraphOne.y,
        x2: selectedGraphTwo.x,
        y2: selectedGraphTwo.y
      });
    }
    clearSelection();
  }
}
function clearSelection() {
  selectedGraphOne = null;
  selectedGraphTwo = null;
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
