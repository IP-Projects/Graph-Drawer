var size = 30;
var color = "#ff2626";
var nodeArray = [];
var lineArray = [];

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var selectedGraphOne = null;
var selectedGraphTwo = null;
var selectedGraphForMove = null;

window.addEventListener("resize", resizeCanvas, false);
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  redrawStuff();
}
resizeCanvas();

document.getElementById("canvas").addEventListener("click", (e) => {
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  var nodeExists = false;
  var selectedNode = null;
  for (var i = 0; i < nodeArray.length; i++) {
    if (pointInCircle(x, y, nodeArray[i].x, nodeArray[i].y, size)) {
      selectedNode = nodeArray[i];
      nodeExists = true;
    }
  }
  if (!nodeExists) {
    createGraph(x, y);
    clearSelection();
  } else {
    connectGraphs(selectedNode);
  }
});

var textForLine = null;
document.getElementById("canvas").addEventListener("mousedown", (e) => {
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  console.log(document.getElementsByTagName("input"));
  var inputArray = document.getElementsByTagName("input");
  if (inputArray.length != 0) {
    if (textForLine == null) {
      for (var i = 0; i < nodeArray.length; i++) {
        if (
          pointInCircle(
            parseInt(inputArray[0].style.left),
            parseInt(inputArray[0].style.top),
            nodeArray[i].x,
            nodeArray[i].y,
            size
          )
        ) {
          nodeArray[i].text = inputArray[0].value;
          inputArray[0].parentNode.removeChild(inputArray[0]);
          clearCanvas();
          redrawStuff();
          break;
        }
      }
    } else {
      lineArray[textForLine].text = inputArray[0].value;
      inputArray[0].parentNode.removeChild(inputArray[0]);
      clearCanvas();
      redrawStuff();
      textForLine = null;
    }
  }

  if (e.button == 1) {
    for (var i = 0; i < nodeArray.length; i++) {
      if (pointInCircle(x, y, nodeArray[i].x, nodeArray[i].y, size)) {
        createInputBox(nodeArray[i].x - size / 2, nodeArray[i].y - size / 2.5);
      }
    }
  } else {
    for (var i = 0; i < nodeArray.length; i++) {
      if (pointInCircle(x, y, nodeArray[i].x, nodeArray[i].y, size)) {
        selectedGraphForMove = i;
      }
    }
  }
});
document.getElementById("canvas").addEventListener("mouseup", (e) => {
  selectedGraphForMove = null;
});

document.getElementById("canvas").addEventListener("mousemove", (e) => {
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  if (selectedGraphForMove != null) {
    nodeArray[selectedGraphForMove].x = x;
    nodeArray[selectedGraphForMove].y = y;
    clearCanvas();
    redrawStuff();
    selectedGraphOne = null;
    selectedGraphTwo = null;
  }
});

document.getElementById("canvas").addEventListener(
  "contextmenu",
  (e) => {
    e.preventDefault();

    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    var ok = false;
    var nodeToRemove;
    for (var i = 0; i < nodeArray.length; i++) {
      if (pointInCircle(x, y, nodeArray[i].x, nodeArray[i].y, size)) {
        x = nodeArray[i].x;
        y = nodeArray[i].y;
        nodeToRemove = nodeArray[i];
        ok = true;
      }
    }
    if (ok) {
      nodeArray = nodeArray.filter((item) => item != nodeToRemove);
      lineArray = lineArray
        .filter((item) => item[0] != nodeToRemove)
        .filter((item) => item[1] != nodeToRemove);
      clearCanvas();
      redrawStuff();
    }
    return false;
  },
  false
);
