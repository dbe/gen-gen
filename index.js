const ROWS = 13;
const COLS = 18;

const EVEN_OFFSET = 81
const ODD_OFFSET = 144

const DIST = 126

let canvas;

function draw() {
  canvas = SVG('drawing').size(2250.76, 1404.72)

  for(let row = 0; row < ROWS; row++) {
    let cols = (row % 2 == 0) ? COLS : COLS - 1
    for(let col = 0; col < cols; col++) {
      let circle = drawCircle();

      if(row % 2 == 0) {
        circle.cx(EVEN_OFFSET + (col * DIST)).cy(81 + (DIST * row))
      } else {
        circle.cx(ODD_OFFSET + (col * DIST)).cy(81 + (DIST * row))
      }
    }
  }

  console.log(canvas.svg())
}


function drawCircle() {
  return canvas.circle(100).attr({
    fill: '#fff',
    stroke: '#000'
  })
}




















checkSVG();
function checkSVG() {
  if(window.SVG === undefined) {
    console.log("Undefined, checking again")
    setTimeout(checkSVG, 100)
  } else {
    console.log("SVG: ", SVG);
    draw();
  }
}
