function pointInCircle(x, y, cx, cy, radius) {
  var distanceSquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
  return distanceSquared <= radius * radius;
  // const circle = new Path2D();
  // circle.arc(x, y, radius, 0, Math.PI * 2, true);
  // console.log(ctx.isPointInPath(circle, cx, cy));
  // return ctx.isPointInPath(circle, cx, cy);
}

// function pointNearLine(x1, y1, x2, y2, cx, cy, size) {
//   var validClick = false;
//   const line = new Path2D();
//   line.moveTo(x1, y1);
//   line.lineTo(x2, y2);
//   line.stroke();
//   if (ctx.isPointInPath(line, cx, cy)) {
//     validClick = true;
//   }
//   console.log(validClick);
// }

function interChange(x1, x2) {
  if (x1 > x2) {
    return;
  }
}

function compareObjects(obj1, obj2) {
  var flag = true;
  console.log(obj1, obj2);
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

function checkNodeCollision(node, x, y, size) {
  return Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2)) < 2 * size;
}

// // returns the length of a line (two points) // line=[[x0,y0],[x1,y1]]
// function lineLen(x1, y1, x2, y2) {
//   var xd = x1 - x2;
//   var yd = y1 - y2;
//   return Math.sqrt(xd * xd + yd * yd);
// }

// // returns a point on a single line (two points) using distance // line=[[x0,y0],[x1,y1]]
// function pntOnLine(line, distance) {
//   t = distance / lineLen(line);
//   xt = (1 - t) * line[0][0] + t * line[1][0];
//   yt = (1 - t) * line[0][1] + t * line[1][1];
//   return [xt, yt];
// }
