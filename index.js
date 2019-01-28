// const ROWS = 13;
// const COLS = 18;
const ROWS = 5;
const COLS = 5;
const EVEN_OFFSET = 81
const ODD_OFFSET = 144
const DIST = 126

const RAW_LOGO = `<svg id="logo" data-name="logo" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .cls-1 {
        fill: #000;
      }
    </style>
  </defs>
  <title>logo</title>
  <g>
    <g>
      <polygon class="cls-1" points="12.08 7.6 10.71 7.6 10.71 5.61 11.83 5.61 11.83 4.65 10.71 4.65 10.71 2.73 12.08 2.73 12.08 1.75 9.56 1.75 9.56 8.58 12.08 8.58 12.08 7.6"/>
      <polygon class="cls-1" points="13.71 8.58 14.85 8.58 14.85 2.73 15.71 2.73 15.71 1.75 12.85 1.75 12.85 2.73 13.71 2.73 13.71 8.58"/>
      <polygon class="cls-1" points="19.65 8.58 19.65 1.75 18.53 1.75 18.53 4.75 17.59 4.75 17.59 1.75 16.47 1.75 16.47 8.58 17.59 8.58 17.59 5.69 18.53 5.69 18.53 8.58 19.65 8.58"/>
      <path class="cls-1" d="M20.64,1.75v6.83h2.21a.88.88,0,0,0,.94-.94V2.7a.89.89,0,0,0-.94-.94Zm2,5.69a.15.15,0,0,1-.16.16H21.8V2.7h.69a.16.16,0,0,1,.16.16Z"/>
      <polygon class="cls-1" points="27.45 2.73 27.45 1.75 24.93 1.75 24.93 8.58 27.45 8.58 27.45 7.6 26.07 7.6 26.07 5.61 27.19 5.61 27.19 4.65 26.07 4.65 26.07 2.73 27.45 2.73"/>
      <polygon class="cls-1" points="30.6 5.86 29.3 1.75 28.35 1.75 28.35 8.58 29.32 8.58 29.32 4.73 30.62 8.58 31.56 8.58 31.56 1.75 30.6 1.75 30.6 5.86"/>
      <polygon class="cls-1" points="34.62 1.75 34.07 6.5 33.53 1.75 32.38 1.75 33.49 8.58 34.63 8.58 35.72 1.75 34.62 1.75"/>
      <polygon class="cls-1" points="36.54 8.58 39.06 8.58 39.06 7.6 37.69 7.6 37.69 5.61 38.81 5.61 38.81 4.65 37.69 4.65 37.69 2.73 39.06 2.73 39.06 1.75 36.54 1.75 36.54 8.58"/>
      <path class="cls-1" d="M42.57,6.25a.78.78,0,0,0,.51-.79v-2.88a.78.78,0,0,0-.82-.84h-2.31v6.84h1.15V6.3h.39l.47,2.28h1.13Zm-.6-1s0,.09-.07.09h-.79V2.7h.79s.07.05.07.1Z"/>
    </g>
    <g>
      <polygon class="cls-1" points="3.01 6.91 3.01 3.83 0 5.15 3.01 6.91"/>
      <polygon class="cls-1" points="3.01 3.62 3.01 0 0.1 4.89 3.01 3.62"/>
      <polygon class="cls-1" points="3.2 0 3.2 3.62 6.15 4.91 3.2 0"/>
      <polygon class="cls-1" points="3.2 3.83 3.2 6.91 6.21 5.15 3.2 3.83"/>
      <polygon class="cls-1" points="3.01 10 3.01 7.53 0.02 5.78 3.01 10"/>
      <polygon class="cls-1" points="3.2 10 6.19 5.78 3.2 7.53 3.2 10"/>
    </g>
  </g>
</svg>`

let canvas;


function draw() {
  canvas = SVG('drawing').size(2250.76, 1404.72)
  // let logo = canvas.svg(RAW_LOGO)
  canvas.svg(RAW_LOGO)
  let logo = SVG.get('logo')

  window.logo = logo
  console.log('logo: ', logo);

  for(let row = 0; row < ROWS; row++) {
    let cols = (row % 2 == 0) ? COLS : COLS - 1
    for(let col = 0; col < cols; col++) {
      let circle = drawCircle();

      if(row % 2 == 0) {
        circle.cx(EVEN_OFFSET + (col * DIST)).cy(81 + (DIST * row))
        logo.x(EVEN_OFFSET + (col * DIST)).y(81 + (DIST * row)).front()
      } else {
        circle.cx(ODD_OFFSET + (col * DIST)).cy(81 + (DIST * row))
        logo.x(ODD_OFFSET + (col * DIST)).cy(81 + (DIST * row))
      }
    }
  }

  // console.log(canvas.svg())
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
