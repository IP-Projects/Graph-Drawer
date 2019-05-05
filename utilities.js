function pointInCircle(x, y, cx, cy, radius) {
  var distanceSquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
  return distanceSquared <= radius * radius;
}

// function pointInRectangle(x1, y1, x2, y2, cx, cy, size) {
//   // x1,y1 and x2,y2 are the coordinates of the points that defines the lines that bind the nodes together
//   // using them a rectangle area will be determined to ensure there are no collisions

//   if (x1 > x2) {
//     var temp = x1;
//     x1 = x2;
//     x2 = temp;

//     temp = y1;
//     y1 = y2;
//     y2 = temp;
//   }
//   console.log(x1, y1, x2, y2, cx, cy, size);

//   if (
//     cx >= x1 &&
//     cx <= x2 &&
//     ((cy >= y1 - size && cy <= y1 + size) || (cy >= y2 - size && cy <= y2 + size))
//   ) {
//     return true;
//   }
//   return false;
// }

function interChange(x1, x2) {
  if (x1 > x2) {
    return;
  }
}

function compareObjects(obj1, obj2) {
  var flag = true;

  if (Object.keys(obj1).length == Object.keys(obj2).length) {
    for (key in obj1) {
      if (obj1[key] != obj2[key]) {
        flag = false;
        break;
      }
    }
  } else {
    flag = false;
  }
  return flag;
}
