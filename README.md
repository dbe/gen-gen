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

## Related

This repo is one half of the Buffidai ETH Denver 2019 tooling:

- **gen-gen** (this repo) — Generates printable SVG sheets of physical Ethereum coins, each containing a QR code with the private key. These are the coins distributed at the event.
- **[eth-denver-admin](https://github.com/dbe/eth-denver-admin)** — Generates CSV lists of the corresponding public addresses and provides a React UI for administration and tracking.

Both repos use the same HD derivation path and color-based offset scheme.

## Dependencies

- [ethers](https://www.npmjs.com/package/ethers) — HD wallet derivation
- [qrcode-svg](https://www.npmjs.com/package/qrcode-svg) — QR code generation
- [svg.js](https://www.npmjs.com/package/svg.js) / [svgdom](https://www.npmjs.com/package/svgdom) — SVG DOM manipulation
