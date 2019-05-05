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
    nodeArray.push({ x: x, y: y, text: "" });
  }
}

function connectGraphs(graph) {
  if (selectedGraphOne != null && !compareObjects(selectedGraphOne, graph)) {
    selectedGraphTwo = graph;
  } else {
    selectedGraphOne = graph;
  }
  if (selectedGraphOne && selectedGraphTwo) {
    var ok = true;
    for (var i = 0; i < lineArray.length; i++) {
      if (
        (compareObjects(selectedGraphOne, lineArray[i][0]) &&
          compareObjects(selectedGraphTwo, lineArray[i][1])) ||
        (compareObjects(selectedGraphOne, lineArray[i][1]) &&
          compareObjects(selectedGraphTwo, lineArray[i][0]))
      ) {
        ok = false;
        textForLine = i;
        createInputBox(
          (selectedGraphOne.x + selectedGraphTwo.x) / 2,
          (selectedGraphOne.y + selectedGraphTwo.y) / 2
        );
      }
    }
    if (ok) {
      drawLine(selectedGraphOne.x, selectedGraphOne.y, selectedGraphTwo.x, selectedGraphTwo.y);
      lineArray.push([selectedGraphOne, selectedGraphTwo]);
      createInputBox(
        (selectedGraphOne.x + selectedGraphTwo.x) / 2,
        (selectedGraphOne.y + selectedGraphTwo.y) / 2
      );
      textForLine = lineArray.length - 1;
    }
    clearSelection();
  }
}

function createInputBox(x, y) {
  var input = document.createElement("INPUT");
  input.setAttribute("type", "text");
  input.setAttribute("autofocus", "autofocus");
  input.style.position = "absolute";
  input.style.top = y;
  input.style.left = x;
  input.style.width = size;
  document.body.appendChild(input);
}

function clearSelection() {
  selectedGraphOne = null;
  selectedGraphTwo = null;
}

function redrawStuff() {
  nodeArray.forEach((element) => {
    drawCircle(element.x, element.y);
    ctx.font = "15px Arial";
    ctx.fillStyle = "green";
    ctx.fillText(element.text, element.x - size / 2, element.y);
  });
  lineArray.forEach((element) => {
    drawLine(element[0].x, element[0].y, element[1].x, element[1].y);
    ctx.font = "15px Arial";
    ctx.fillStyle = "green";
    ctx.fillText(
      element.text,
      (element[0].x + element[1].x) / 2 - size / 2,
      (element[0].y + element[1].y) / 2
    );
  });
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawCircle(x, y) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2, true);
  ctx.fill();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
