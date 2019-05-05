var size = 30;
var color = "#ff2626";
var nodeArray = [];
var lineArray = [];
var textArray = [];

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

  var ok = true;
  var selectedNode = null;
  // for (var i = 0; i < lineArray.length; i++) {
  //   console.log(
  //     pointInRectangle(lineArray[i].x1, lineArray[i].y1, lineArray[i].x2, lineArray[i].y2, x, y, 50)
  //   );
  // }
  for (var i = 0; i < nodeArray.length; i++) {
    if (pointInCircle(x, y, nodeArray[i].x, nodeArray[i].y, size)) {
      selectedNode = nodeArray[i];
      ok = false;
    }
  }
  if (ok) {
    createGraph(x, y);
    clearSelection();
  } else {
    connectGraphs(selectedNode);
  }
  console.log(document.getElementsByTagName("input").length);
  var inputArray = document.getElementsByTagName("input");
  var textArrayLen = textArray.length;
  for (var i = 0; i < inputArray.length; i++) {
    console.log(inputArray[i]);
    for (var j = 0; j < textArray.length; j++) {
      if (textArray[i].x != inputArray[i].style.left && textArray[i].y != inputArray[i].style.top) {
        textArray.push({
          x: inputArray[i].style.left,
          y: inputArray[i].style.top,
          text: inputArray[i].value
        });
      }
      inputArray[i].remove();
    }
  }
  if (textArrayLen != textArray.length) {
    redrawStuff();
  }
  // document.getElementsByTagName('input').forEach(element =>{
  //   console.log(element)
  // })
});

//document.getElementById("canvas").addEventListener("auxclick ", e => {

// var rect = canvas.getBoundingClientRect();
// var x = event.clientX - rect.left;
// var y = event.clientY - rect.top;
// var ok = false;
// var selectedNode = null;
// for (var i = 0; i < nodeArray.length; i++) {
//   if (pointInCircle(x, y, nodeArray[i].x, nodeArray[i].y, size)) {
//     selectedNode =  nodeArray[i];
//     ok = true;
//   }
// }
// if(ok){
// var input = document.createElement("INPUT");
// input.setAttribute("type", "text");
// input.style.position = 'absolute';
// input.style.top = y - size/2;
// input.style.left = x - size/2;
// input.style.width = size;
// document.body.appendChild(input);
// }
//});

document.getElementById("canvas").addEventListener("mousedown", (e) => {
  console.log(e);
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  // if (e.button == 1) {
  //   var input = document.createElement("INPUT");
  //   input.setAttribute("type", "text");
  //   input.style.position = "absolute";
  //   input.style.top = y - size / 2;
  //   input.style.left = x - size / 2;
  //   input.style.width = size;
  //   document.body.appendChild(input);
  // } else {
  for (var i = 0; i < nodeArray.length; i++) {
    if (pointInCircle(x, y, nodeArray[i].x, nodeArray[i].y, size)) {
      selectedGraphForMove = i;
    }
  }
  // }
});
document.getElementById("canvas").addEventListener("mouseup", (e) => {
  selectedGraphForMove = null;
});

document.getElementById("canvas").addEventListener("mousemove", (e) => {
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  if (selectedGraphForMove != null) {
    updateLines(nodeArray[selectedGraphForMove].x, nodeArray[selectedGraphForMove].y, x, y);
    nodeArray[selectedGraphForMove].x = x;
    nodeArray[selectedGraphForMove].y = y;
    clearCanvas();
    redrawStuff();
    selectedGraphOne = null;
    selectedGraphTwo = null;
  }
});

function updateLines(x, y, nx, ny) {
  for (var i = 0; i < lineArray.length; i++) {
    if (x == lineArray[i].x1 && y == lineArray[i].y1) {
      lineArray[i].x1 = nx;
      lineArray[i].y1 = ny;
    }
    if (x == lineArray[i].x2 && y == lineArray[i].y2) {
      lineArray[i].x2 = nx;
      lineArray[i].y2 = ny;
    }
  }
}

document.getElementById("canvas").addEventListener(
  "contextmenu",
  (e) => {
    e.preventDefault();

    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    var ok = false;
    var toRemove;
    for (var i = 0; i < nodeArray.length; i++) {
      if (pointInCircle(x, y, nodeArray[i].x, nodeArray[i].y, size)) {
        x = nodeArray[i].x;
        y = nodeArray[i].y;
        toRemove = nodeArray[i];
        ok = true;
      }
    }
    if (ok) {
      nodeArray = nodeArray.filter((item) => item != toRemove);
      lineArray = lineArray
        .filter((item) => item.x1 != x && item.y1 != y)
        .filter((item) => item.x2 != x && item.y2 != y);
      clearCanvas();
      redrawStuff();
    }
    return false;
  },
  false
);
