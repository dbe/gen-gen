var Buffer = require('buffer/').Buffer

const ROWS = 13;
const COLS = 18;
// const ROWS = 5;
// const COLS = 5;
const EVEN_OFFSET = 81
const ODD_OFFSET = 144
const ODD_DIFF = 63;
const DIST = 126

let canvas;

let defs = `
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

function draw() {
  canvas = SVG('drawing').size(2400, 1500)
  canvas.svg(defs)

  // let coinNumber = 456;
  let coinNumber = 0;
  for(let row = 0; row < ROWS; row++) {
    let cols = (row % 2 == 0) ? COLS : COLS - 1

      // if(coinNumber >= 500) {
      //   break;
      // }

    for(let col = 0; col < cols; col++) {
      // let correction = ["L", "M", "Q", "H"][coinNumber % 4]
      let correction = "M"

      // if(coinNumber >= 500) {
      //   break;
      // }

      pkFromSerial(coinNumber)

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

  let template = `
    <svg>
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
            content: `https://buffidai.io/pk#${pkFromSerial(serial)}`,
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

    template2 = `
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .cls-1 {
            fill: #fff;
          }
        </style>
      </defs>
      <title>BuffiFace19-1.51</title>
      <circle cx="54.36" cy="54.36" r="54.36"/>
      <g>
        <path class="cls-1" d="M54.36,6.71A47.65,47.65,0,1,1,6.71,54.36,47.71,47.71,0,0,1,54.36,6.71m0-1A48.65,48.65,0,1,0,103,54.36,48.65,48.65,0,0,0,54.36,5.71Z"/>
        <g>
          <path class="cls-1" d="M68.82,86.61H65.11L65,86.09l1.94-1.83a2.32,2.32,0,0,0,.89-1.52,1,1,0,0,0-1.13-1.07,1.63,1.63,0,0,0-1.34.88L65,82.1A2,2,0,0,1,66.75,81a1.65,1.65,0,0,1,1.84,1.62,2.87,2.87,0,0,1-1.16,2L66,86h2.8Z"/>
          <path class="cls-1" d="M71.5,86.7c-1.48,0-2.1-1.4-2.1-2.83S70,81,71.5,81s2.1,1.4,2.1,2.83S73,86.7,71.5,86.7Zm0-5c-.88,0-1.32.9-1.32,2.16S70.62,86,71.5,86s1.32-.91,1.32-2.16S72.38,81.7,71.5,81.7Z"/>
          <path class="cls-1" d="M76.15,86.61H75.4V81.69H74.33v-.57h1.82Z"/>
          <path class="cls-1" d="M80.9,86a1.88,1.88,0,0,1-1.55.72,2.31,2.31,0,0,1-1.59-.56l.33-.51a1.88,1.88,0,0,0,1.25.45,1.14,1.14,0,0,0,1-.5,2.89,2.89,0,0,0,.46-1.77,1.55,1.55,0,0,1-1.49.81,1.65,1.65,0,0,1-1.69-1.68A1.81,1.81,0,0,1,79.5,81a1.83,1.83,0,0,1,1.66.95,3.34,3.34,0,0,1,.39,1.79A3.49,3.49,0,0,1,80.9,86Zm-1.38-4.34a1.2,1.2,0,1,0,1.15,1.2A1.12,1.12,0,0,0,79.52,81.64Z"/>
        </g>
        <g>
          <path class="cls-1" d="M78.6,51l-4.15-4.58a.12.12,0,0,1,0-.18l1-.62a.12.12,0,0,0-.06-.22l-5.1-.25a.12.12,0,0,1-.09-.19l.53-.58a.12.12,0,0,0-.14-.19l-3.25,1.47a.11.11,0,0,1-.15-.06,11.85,11.85,0,0,0-2-2.86.12.12,0,0,1,.06-.2l.24,0a.12.12,0,0,0,.06-.2,8.4,8.4,0,0,0-3.73-1.87.11.11,0,0,1-.05-.19L62,40a.11.11,0,0,0-.06-.19l-4.29-.84a.11.11,0,0,1-.06-.18h0a.12.12,0,0,0-.06-.19c-5.51-1.69-13.34-.11-14.61.16a.12.12,0,0,0-.07.19l.15.19a.11.11,0,0,1-.06.18l-3,1a.12.12,0,0,0-.07.17l.08.15a.11.11,0,0,1-.06.16c-1.07.43-3,1.29-6.46,2.52s-9.38,2-13.24,2.87-4.51,2.61-4.84,3.31a22,22,0,0,0-.71,3.78c-.1.67-1.74,2.31-2,3.19s.66,2.74.54,3.25v0A4.37,4.37,0,0,0,14,56.56c0-.12.16-.12.17,0a4.1,4.1,0,0,1-1.29,3.6.45.45,0,0,0,.13.1,3.33,3.33,0,0,0,1.72-.58h0A7.52,7.52,0,0,0,16,58.62a2.21,2.21,0,0,0,.22-2.93l0,0a7.92,7.92,0,0,1,.36-5.73c.69-1.34,1.11-1,1.22-.79s-.11.5-.15.55v0c-2.23,4.64,1.19,9.23,1.24,9.57s-.17,3-.89,3.75a4.3,4.3,0,0,0-1.07,2,9.53,9.53,0,0,1-.78,2.8c-.68,1.23-1.63,7.67-1.63,8.07s.61-.28,1.17.16c.38.31,0,.77-.31,1a.12.12,0,0,0,.08.21h3.16a.12.12,0,0,0,.12-.12c0-1.23-.68-1.22-1.12-2.07s.3-1.65.54-3.47c.54-4,3.42-4.61,4.08-4.7a.12.12,0,0,1,.13.12v1.49a.13.13,0,0,0,0,.1c.26.19,1.53,1.23,1.53,2S26.16,75.92,27,76c.63,0,.13.75-.16,1.09a.12.12,0,0,0,.09.2h3.59a.12.12,0,0,0,.11-.15c-.41-1.43-1.28-1.58-2.26-2.74-2-2.36-1.7-5.91-1.76-7.48s.34-1.46.34-1.46C32.1,59.28,40.4,62.75,41,64.83s3.9,3.63,4,3.69h0l.63.24a.13.13,0,0,1,.07.14L45.15,71a.12.12,0,0,0,.12.15l.95,0a.12.12,0,0,1,.12.11l.16,2.2a.11.11,0,0,0,.14.1l1.61-.39a.12.12,0,0,1,.14.12A2.43,2.43,0,0,0,48.91,75c.37.39,0,.92-.29,1.2a.12.12,0,0,0,.08.2h4.13a.12.12,0,0,0,.12-.12c0-1.91-1-1.81-1.24-3.08-.23-1.08.81-2.21,1.14-2.54a.12.12,0,0,1,.18,0l1.83,2.63a.11.11,0,0,0,.21,0c.09-.37.29-1,.57-.4.39.78,2.63,2,3.53,2.41.63.31.6.73.52,1a.12.12,0,0,0,.11.16h4.3a.12.12,0,0,0,.11-.16c-.22-.55-1-2.37-2.52-2.37-1.21,0-2-2.85-2.47-5.49C58.83,66.12,60.65,66,61.13,66a.11.11,0,0,1,.11.12v.77a.12.12,0,0,0,.19.09l2.09-1.62a.12.12,0,0,1,.19.1v.6a.12.12,0,0,0,.15.12l2.54-.87a.11.11,0,0,1,.14.08l1.18,3.69a.12.12,0,0,0,.21,0l.31-.47a.13.13,0,0,1,.21,0l1,2.19a.12.12,0,0,0,.18.05l.41-.34a.11.11,0,0,1,.16,0l.41.51a.11.11,0,0,0,.2,0l.67-2.31a.12.12,0,0,1,.19-.06l.55.4a.11.11,0,0,0,.18-.07L73,65.1a.12.12,0,0,1,.12-.1c3.93.12,3.6-2.36,3.43-2.75A14.63,14.63,0,0,1,77.21,56a7.79,7.79,0,0,0,.05-4.73.12.12,0,0,1,.11-.15h1.15A.11.11,0,0,0,78.6,51Z"/>
          <g>
            <polygon class="cls-1" points="90.46 42.77 90.45 42.77 90.41 42.68 90.46 42.77"/>
            <path class="cls-1" d="M90.14,45.35,89.62,45,88,43.86a.27.27,0,0,1-.1-.11h0a.47.47,0,0,1,0-.17c0-.19,0-.38,0-.56L88,41a.33.33,0,0,1,.08-.18.31.31,0,0,1,.23-.08l4.37.41a.35.35,0,0,1,.22.11h0l0,.06v0a.32.32,0,0,1-.06.23l-1.88,2.9-.51.79a.3.3,0,0,1-.18.14A.29.29,0,0,1,90.14,45.35Zm1.63-3.79-2.65-.25.26.22.9.75Zm-3.4,1.63,1.39-.66-1.24-1Zm2.09-.42,0-.09,0,.09ZM92,42l-1.5.72c0,.51,0,1,0,1.54Zm-2,1-1.39.67,1.43,1Z"/>
            <path class="cls-1" d="M87.59,41.27a.31.31,0,0,1,0,.2l-.08.91c0,.52-.09,1.06-.13,1.58L89,45l.34.23.19.13a.23.23,0,0,1,.11.2.27.27,0,0,1-.09.22.34.34,0,0,1-.24.05l-3.84-.67a.41.41,0,0,1-.2-.09h0l0-.1v0a.33.33,0,0,1,0-.21l1.41-2.56.34-.62.15-.27a.27.27,0,0,1,.22-.14A.28.28,0,0,1,87.59,41.27Zm-1.51,3,.83-.4c0-.43.07-.86.11-1.29Zm1,.08-.82.39,1.9.33Z"/>
            <path class="cls-1" d="M90.44,38.48a.28.28,0,0,1-.1.38.29.29,0,0,1-.38-.11.27.27,0,0,1,.11-.37A.27.27,0,0,1,90.44,38.48Z"/>
            <path class="cls-1" d="M83,48a.29.29,0,0,1-.11.38.28.28,0,0,1-.38-.11A.28.28,0,0,1,83,48Z"/>
            <path class="cls-1" d="M77.39,39.43a.29.29,0,0,1-.11.38.28.28,0,0,1-.27-.49A.29.29,0,0,1,77.39,39.43Z"/>
            <path class="cls-1" d="M87.37,51.74a.29.29,0,0,1-.11.38.27.27,0,0,1-.37-.11.27.27,0,0,1,.1-.37A.28.28,0,0,1,87.37,51.74Z"/>
            <path class="cls-1" d="M92.12,36.34a.28.28,0,0,1,.11-.38.27.27,0,0,1,.26.48A.27.27,0,0,1,92.12,36.34Z"/>
            <path class="cls-1" d="M77.33,42.56a.28.28,0,0,1,.11-.38.27.27,0,0,1,.26.48A.27.27,0,0,1,77.33,42.56Z"/>
            <path class="cls-1" d="M97.08,31.74a.28.28,0,0,1,.27-.29.28.28,0,0,1,.28.27.28.28,0,0,1-.27.28A.26.26,0,0,1,97.08,31.74Z"/>
            <path class="cls-1" d="M96.54,42.05a.27.27,0,0,1,.27-.29.28.28,0,0,1,0,.55A.26.26,0,0,1,96.54,42.05Z"/>
            <path class="cls-1" d="M92.29,46.89a.27.27,0,0,1-.1.37.27.27,0,0,1-.38-.1.28.28,0,0,1,.11-.38A.27.27,0,0,1,92.29,46.89Z"/>
            <g>
              <rect class="cls-1" x="80.74" y="42.48" width="1.58" height="0.44" transform="translate(1.11 87.45) rotate(-56.74)"/>
              <rect class="cls-1" x="81.31" y="41.91" width="0.44" height="1.58" transform="translate(1.11 87.45) rotate(-56.74)"/>
            </g>
            <g>
              <rect class="cls-1" x="88.04" y="35.44" width="1.58" height="0.44" transform="translate(10.3 90.38) rotate(-56.74)"/>
              <rect class="cls-1" x="88.61" y="34.87" width="0.44" height="1.58" transform="translate(10.3 90.38) rotate(-56.74)"/>
            </g>
            <g>
              <rect class="cls-1" x="91.52" y="48.55" width="1.58" height="0.44" transform="translate(0.9 99.21) rotate(-56.74)"/>
              <rect class="cls-1" x="92.09" y="47.98" width="0.44" height="1.58" transform="translate(0.9 99.21) rotate(-56.74)"/>
            </g>
            <g>
              <rect class="cls-1" x="95.86" y="39.45" width="1.58" height="0.44" transform="translate(-7.06 52.24) rotate(-29.23)"/>
              <rect class="cls-1" x="96.43" y="38.87" width="0.44" height="1.58" transform="translate(-7.06 52.24) rotate(-29.23)"/>
            </g>
          </g>
          <path class="cls-1" d="M12.85,60.13a.37.37,0,0,0,.15.13h0l.58-.13.22-.46L15.15,56l-.87-.37-1.46,2.68S13.13,59.68,12.85,60.13Z"/>
          <path class="cls-1" d="M73.35,47.75l10.54-2.26a.13.13,0,0,1,.09.23l-9.51,5.71Z"/>
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

function pkFromSerial(serial) {
  let wallet = ethers.Wallet.fromMnemonic(MN, `m/44'/60'/0'/0'/0/${serial}`);
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
