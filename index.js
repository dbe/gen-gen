// const ROWS = 13;
// const COLS = 18;
const ROWS = 5;
const COLS = 5;
const EVEN_OFFSET = 81
const ODD_OFFSET = 144

const ODD_DIFF = 63;

const DIST = 126

let canvas;

let defs = `
<defs>
      <style>
        .cls-1 {
          fill: none;
        }

        .cls-2 {
          clip-path: url(#clip-path);
        }

        .cls-3 {
          font-size: 10.99px;
        }

        .cls-3, .cls-6 {
          font-family: ArialMT, Arial;
        }

        .cls-5 {
          fill-rule: evenodd;
        }

        .cls-6 {
          font-size: 10.2px;
        }

        .cls-6, .cls-7 {
          fill: #fff;
        }
      </style>
      <clipPath id="clip-path" transform="translate(-5 -5)">
        <rect class="cls-1" x="34.5" y="17.75" width="75" height="75"/>
      </clipPath>
      <clipPath id="clip-path-2" transform="translate(-5 -5)">
        <rect class="cls-1" x="31" y="31" width="82" height="82"/>
      </clipPath>
    </defs>
`

let defs2 = `
<defs>
    <style>
      .cls-1 {
        font-size: 10.2px;
        font-family: ArialMT, Arial;
      }

      .cls-1, .cls-2 {
        fill: #fff;
      }
    </style>
  </defs>
  `

function draw() {
  // canvas = SVG('drawing').size(2250.76, 1404.72)
  canvas = SVG('drawing').size(2400, 1500)
  // canvas.svg(defs)
  canvas.svg(defs2)

  let coinNumber = 0;
  for(let row = 0; row < ROWS; row++) {
    let cols = (row % 2 == 0) ? COLS : COLS - 1

    for(let col = 0; col < cols; col++) {
      let correction = ["L", "M", "Q", "H"][coinNumber % 4]

      if(row % 2 == 0) {
        createCoin(canvas, col * DIST, 107 * row, coinNumber, correction)
      } else {
        createCoin(canvas, ODD_DIFF + (col * DIST), 107 * row, coinNumber, correction)
      }

      coinNumber++;
    }
  }

  console.log(canvas.svg())
}

function createCoin(canvas, x, y, serial, correction) {
  let digits = serial.toString().padStart(7, '0').split('')

  let template =  `
  <svg>
    <title>full2</title>
    <g>
      <circle cx="67" cy="67" r="53.5"/>
      <path d="M72,19A53,53,0,1,1,19,72,53.07,53.07,0,0,1,72,19m0-1a54,54,0,1,0,54,54A54,54,0,0,0,72,18Z" transform="translate(-5 -5)"/>
      <g class="cls-4">
        <g class="cls-4">
          <g class="cls-4" transform="translate(26 26)">
            ${new QRCode({
              content: "https://buffidai.io/pk#TVpjv2h-E_hK3fxo4kyawO3W6A2FBsPo8AtzRv3DShw",
              padding: 8,
              width: 82.5,
              height: 82.5,
              ecl: correction,
            }).svg()}
          </g>
        </g>
      </g>
      <path class="cls-5" d="M106.35,106.38H36.62V36.65h69.73ZM117,26H25v92h92Z" transform="translate(-5 -5)"/>

      <text class="cls-6" transform="translate(52.89 112.76)">${digits[0]}</text>
      <text class="cls-6" transform="translate(47.07 112.76)">${digits[1]}</text>
      <text class="cls-6" transform="translate(58.56 112.76)">${digits[2]}</text>
      <text class="cls-6" transform="translate(64.23 112.76)">${digits[3]}</text>
      <text class="cls-6" transform="translate(69.91 112.76)">${digits[4]}</text>
      <text class="cls-6" transform="translate(75.58 112.76)">${digits[5]}</text>
      <text class="cls-6" transform="translate(81.25 112.76)">${digits[6]}</text>

      <path class="cls-7" d="M139,72A67,67,0,1,1,72,5,67,67,0,0,1,139,72ZM72,17.88A54.12,54.12,0,1,0,126.12,72,54.12,54.12,0,0,0,72,17.88Z" transform="translate(-5 -5)"/>
      <polygon class="cls-7" points="57.54 27.6 56.16 27.6 56.16 25.61 57.29 25.61 57.29 24.65 56.16 24.65 56.16 22.73 57.54 22.73 57.54 21.75 55.02 21.75 55.02 28.58 57.54 28.58 57.54 27.6"/>
      <polygon class="cls-7" points="59.17 28.58 60.3 28.58 60.3 22.73 61.16 22.73 61.16 21.75 58.31 21.75 58.31 22.73 59.17 22.73 59.17 28.58"/>
      <polygon class="cls-7" points="65.1 28.58 65.1 21.75 63.98 21.75 63.98 24.75 63.05 24.75 63.05 21.75 61.93 21.75 61.93 28.58 63.05 28.58 63.05 25.69 63.98 25.69 63.98 28.58 65.1 28.58"/>
      <path class="cls-7" d="M71.1,26.75v6.83h2.2a.89.89,0,0,0,1-.94V27.69a.89.89,0,0,0-1-.94Zm2,5.69a.14.14,0,0,1-.16.15h-.7V27.72h.7a.15.15,0,0,1,.16.16Z" transform="translate(-5 -5)"/>
      <polygon class="cls-7" points="72.9 22.73 72.9 21.75 70.38 21.75 70.38 28.58 72.9 28.58 72.9 27.6 71.53 27.6 71.53 25.61 72.65 25.61 72.65 24.65 71.53 24.65 71.53 22.73 72.9 22.73"/>
      <polygon class="cls-7" points="76.06 25.86 74.76 21.75 73.8 21.75 73.8 28.58 74.77 28.58 74.77 24.73 76.08 28.58 77.02 28.58 77.02 21.75 76.06 21.75 76.06 25.86"/>
      <polygon class="cls-7" points="80.07 21.75 79.52 26.49 78.99 21.75 77.83 21.75 78.94 28.58 80.08 28.58 81.17 21.75 80.07 21.75"/>
      <polygon class="cls-7" points="82 28.58 84.52 28.58 84.52 27.6 83.14 27.6 83.14 25.61 84.26 25.61 84.26 24.65 83.14 24.65 83.14 22.73 84.52 22.73 84.52 21.75 82 21.75 82 28.58"/>
      <path class="cls-7" d="M93,31.25a.78.78,0,0,0,.5-.79V27.58a.78.78,0,0,0-.82-.84h-2.3v6.84h1.15V31.29h.38l.48,2.29h1.13Zm-.6-1-.08.09h-.79V27.73h.79l.08.1Z" transform="translate(-5 -5)"/>
      <polygon class="cls-7" points="48.46 26.91 48.46 23.83 45.45 25.14 48.46 26.91"/>
      <polygon class="cls-7" points="48.46 23.61 48.46 20 45.55 24.89 48.46 23.61"/>
      <polygon class="cls-7" points="48.65 20 48.65 23.61 51.61 24.91 48.65 20"/>
      <polygon class="cls-7" points="48.65 23.83 48.65 26.91 51.66 25.14 48.65 23.83"/>
      <polygon class="cls-7" points="48.46 30 48.46 27.52 45.47 25.78 48.46 30"/>
      <polygon class="cls-7" points="48.65 30 51.64 25.78 48.65 27.52 48.65 30"/>
    </g>
  </svg>
`

let template2 = `
  <svg>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_3_copy" data-name="Layer 3 copy">
      <g>
        <circle cx="72" cy="72" r="53.86" transform="translate(-47.46 54.36) rotate(-45)"/>
        <path d="M72,18.64A53.36,53.36,0,1,1,18.64,72,53.42,53.42,0,0,1,72,18.64m0-1A54.36,54.36,0,1,0,126.36,72,54.36,54.36,0,0,0,72,17.64Z" transform="translate(-17.64 -17.64)"/>
      </g>
    </g>
    <g>
      <text class="cls-1" transform="translate(40.25 100.12)">${digits[0]}</text>
      <text class="cls-1" transform="translate(34.43 100.12)">${digits[1]}</text>
      <text class="cls-1" transform="translate(45.92 100.12)">${digits[2]}</text>
      <text class="cls-1" transform="translate(51.59 100.12)">${digits[3]}</text>
      <text class="cls-1" transform="translate(57.27 100.12)">${digits[4]}</text>
      <text class="cls-1" transform="translate(62.94 100.12)">${digits[5]}</text>
      <text class="cls-1" transform="translate(68.61 100.12)">${digits[6]}</text>
    </g>
  </g>
  <g id="Layer_7" data-name="Layer 7">
    <g transform="translate(21.09 20.72)">
      ${new QRCode({
        content: "https://buffidai.io/pk#TVpjv2h-E_hK3fxo4kyawO3W6A2FBsPo8AtzRv3DShw",
        padding: 4,
        width: 66.54,
        height: 66.54,
        ecl: correction,
      }).svg()}
    </g>
  </g>
  <g id="Layer_5" data-name="Layer 5">
    <g>
      <g>
        <polygon class="cls-2" points="44.9 15.55 43.52 15.55 43.52 13.55 44.65 13.55 44.65 12.6 43.52 12.6 43.52 10.68 44.9 10.68 44.9 9.7 42.38 9.7 42.38 16.53 44.9 16.53 44.9 15.55"/>
        <polygon class="cls-2" points="46.53 16.53 47.66 16.53 47.66 10.68 48.52 10.68 48.52 9.7 45.67 9.7 45.67 10.68 46.53 10.68 46.53 16.53"/>
        <polygon class="cls-2" points="52.46 16.53 52.46 9.7 51.34 9.7 51.34 12.7 50.41 12.7 50.41 9.7 49.29 9.7 49.29 16.53 50.41 16.53 50.41 13.64 51.34 13.64 51.34 16.53 52.46 16.53"/>
        <path class="cls-2" d="M71.1,27.34v6.83h2.2a.89.89,0,0,0,1-.94V28.28a.89.89,0,0,0-1-.94Zm2,5.69a.14.14,0,0,1-.16.15h-.7V28.31h.7a.15.15,0,0,1,.16.16Z" transform="translate(-17.64 -17.64)"/>
        <polygon class="cls-2" points="60.26 10.68 60.26 9.7 57.74 9.7 57.74 16.53 60.26 16.53 60.26 15.55 58.89 15.55 58.89 13.55 60.01 13.55 60.01 12.6 58.89 12.6 58.89 10.68 60.26 10.68"/>
        <polygon class="cls-2" points="63.41 13.81 62.12 9.7 61.16 9.7 61.16 16.53 62.13 16.53 62.13 12.68 63.44 16.53 64.38 16.53 64.38 9.7 63.41 9.7 63.41 13.81"/>
        <polygon class="cls-2" points="67.43 9.7 66.88 14.44 66.35 9.7 65.19 9.7 66.3 16.53 67.44 16.53 68.53 9.7 67.43 9.7"/>
        <polygon class="cls-2" points="69.36 16.53 71.88 16.53 71.88 15.55 70.5 15.55 70.5 13.55 71.62 13.55 71.62 12.6 70.5 12.6 70.5 10.68 71.88 10.68 71.88 9.7 69.36 9.7 69.36 16.53"/>
        <path class="cls-2" d="M93,31.84a.78.78,0,0,0,.5-.79V28.17a.78.78,0,0,0-.82-.84h-2.3v6.84h1.15V31.88h.38l.48,2.29h1.13Zm-.6-1a.1.1,0,0,1-.08.09h-.79V28.32h.79a.1.1,0,0,1,.08.1Z" transform="translate(-17.64 -17.64)"/>
      </g>
      <g>
        <polygon class="cls-2" points="35.82 14.86 35.82 11.78 32.81 13.1 35.82 14.86"/>
        <polygon class="cls-2" points="35.82 11.57 35.82 7.95 32.91 12.84 35.82 11.57"/>
        <polygon class="cls-2" points="36.01 7.95 36.01 11.57 38.97 12.86 36.01 7.95"/>
        <polygon class="cls-2" points="36.01 11.78 36.01 14.86 39.02 13.1 36.01 11.78"/>
        <polygon class="cls-2" points="35.82 17.95 35.82 15.47 32.83 13.73 35.82 17.95"/>
        <polygon class="cls-2" points="36.01 17.95 39 13.73 36.01 15.47 36.01 17.95"/>
      </g>
    </g>
  </g>
</svg>
`



  // return canvas.group().svg(template).x(x).y(y)
  return canvas.group().svg(template2).x(x).y(y)
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


// <image width="150" height="150" transform="translate(26 26) scale(0.55)" xlink:href="data:image/png;base64,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"/>
