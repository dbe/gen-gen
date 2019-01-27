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

function draw() {
  var draw = SVG('drawing').size(300, 300)
  var rect = draw.rect(200, 200).attr({ fill: '#f06' })

  console.log(rect.svg())
}
