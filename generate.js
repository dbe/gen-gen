const window   = require('svgdom')
const SVG      = require('svg.js')(window)
const ethers = require('ethers')
const QRCode = require('qrcode-svg')

const document = window.document
const canvas = SVG(document.documentElement)

// Config
const ROWS = 13;
const COLS = 18;
// const ROWS = 5;
// const COLS = 5;
const EVEN_OFFSET = 81
const ODD_OFFSET = 144
const ODD_DIFF = 63;
const DIST = 126

//Serial codes reset, but we still want to increment the HD wallet path
const offsets = {
  'purple': 0,
  'black': 500,
  'blue': 1300
}
const defs = `
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
`;


draw()

function draw() {
  canvas.size(2400, 1500)
  canvas.svg(defs)

  // let serial = 0;
  // let serial = 228;
  // let serial = 456;
  // let serial = 684;
  // let serial = 912;
  // let serial = 1140;
  // let serial = 1368;
  let serial = 1596;

  let color = 'blue'
  let max = 1700;

  for(let row = 0; row < ROWS; row++) {
    let cols = (row % 2 == 0) ? COLS : COLS - 1

    if(serial >= max) {
      break;
    }

    for(let col = 0; col < cols; col++) {

      if(serial >= max) {
        break;
      }

      let correction = "M"

      let walletNum = serial + offsets[color];
      let pk = pkFromHDPath(walletNum)

      if(row % 2 == 0) {
        createCoin(canvas, col * DIST, 107 * row, serial, correction, pk)
      } else {
        createCoin(canvas, ODD_DIFF + (col * DIST), 107 * row, serial, correction, pk)
      }

      serial++;
    }
  }

  console.log(canvas.svg())
}

function createCoin(canvas, x, y, serial, correction, pk) {
  let digits = serial.toString().padStart(7, '0').split('')

  let template = `
    <svg xmlns:xlink="http://www.w3.org/1999/xlink">
      <g>
        <g>
          <circle cx="72" cy="72" r="53.86" transform="translate(-47.46 54.36) rotate(-45)"/>
          <path d="M72,18.64A53.36,53.36,0,1,1,18.64,72,53.42,53.42,0,0,1,72,18.64m0-1A54.36,54.36,0,1,0,126.36,72,54.36,54.36,0,0,0,72,17.64Z" transform="translate(-17.64 -17.64)"/>
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
      <g>
        <g transform="translate(21.09 20.72)">
          ${new QRCode({
            content: `https://buffidai.io/pk#${pk}`,
            padding: 4,
            width: 66.54,
            height: 66.54,
            ecl: correction,
          }).svg()}
        </g>
      </g>
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
    </svg>
    `

  return canvas.group().svg(template).x(x).y(y)
}

function pkFromHDPath(walletNum) {
  let wallet = ethers.Wallet.fromMnemonic(process.env.MN, `m/44'/60'/0'/0'/0/${walletNum}`);
  // console.log('addr: ', wallet.address)
  // console.log('priv: ', wallet.privateKey)
  let bytes = hexToBytes(wallet.privateKey)
  // console.log('bytes: ', bytes);

  let encoded = encode(bytes)
  // console.log('encoded: ', encoded);

  return encoded;
}


//FROM WEB3UTIlS
function hexToBytes(hex) {
    hex = hex.toString(16);

    hex = hex.replace(/^0x/i, '');
    hex = hex.length % 2 ? '0' + hex : hex;

    let bytes = [];
    for (let c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }

    return bytes;
};


function padString(input) {
    var segmentLength = 4;
    var stringLength = input.length;
    var diff = stringLength % segmentLength;
    if (!diff) {
        return input;
    }
    var position = stringLength;
    var padLength = segmentLength - diff;
    var paddedStringLength = stringLength + padLength;
    var buffer = Buffer.alloc(paddedStringLength);
    buffer.write(input);
    while (padLength--) {
        buffer.write("=", position++);
    }
    return buffer.toString();
}

function encode(input, encoding) {
    if (encoding === void 0) { encoding = "utf8"; }
    if (Buffer.isBuffer(input)) {
        return fromBase64(input.toString("base64"));
    }
    return fromBase64(Buffer.from(input, encoding).toString("base64"));
}
;
function decode(base64url, encoding) {
    if (encoding === void 0) { encoding = "utf8"; }
    return Buffer.from(toBase64(base64url), "base64").toString(encoding);
}
function toBase64(base64url) {
    base64url = base64url.toString();
    return padString(base64url)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");
}
function fromBase64(base64) {
    return base64
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}
function toBuffer(base64url) {
    return Buffer.from(toBase64(base64url), "base64");
}
