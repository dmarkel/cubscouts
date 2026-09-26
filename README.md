# Cub Scout Pack 149 — Materials

Printable leader guides, scout handouts, and family notes for Pack 149.

- [Webelos](Webelos/) — 4th grade den adventures

## Editing and printing

Each document is an HTML file styled for US Letter paper (shared styles in
`Webelos/assets/print.css`), with a ready-to-print PDF next to it. After editing
an HTML file, regenerate the PDFs:

```sh
NODE_PATH=$(npm root -g) node tools/build-pdfs.cjs            # all documents
NODE_PATH=$(npm root -g) node tools/build-pdfs.cjs path/to.html  # just one
```

Requires Node.js and Playwright with Chromium (`npm i -g playwright && npx playwright install chromium`).
