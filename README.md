# gen-gen

Generator for physical Ethereum coin/token SVG sheets for the [Buffidai](https://buffidai.io) project.

Each coin contains a QR code encoding a private key derived from an HD wallet mnemonic (BIP-39 / BIP-44 path `m/44'/60'/0'/0'/0/<serial>`), a serial number, and the Ethereum Denver branding. The output is large SVG sheets arranged in a hex grid layout, intended for print production.

## Usage

### Node (headless generation)

```bash
MN="your twelve word mnemonic phrase here" node generate.js > output.svg
```

### Browser

Bundle with browserify, set the `MN` global, and open `index.html`.

## Configuration

- `ROWS` / `COLS` — grid dimensions
- `color` — selects serial offset (`purple`, `black`, `blue`)
- `serial` — starting serial number
- `correction` — QR error correction level

## Dependencies

- [ethers](https://www.npmjs.com/package/ethers) — HD wallet derivation
- [qrcode-svg](https://www.npmjs.com/package/qrcode-svg) — QR code generation
- [svg.js](https://www.npmjs.com/package/svg.js) / [svgdom](https://www.npmjs.com/package/svgdom) — SVG DOM manipulation
