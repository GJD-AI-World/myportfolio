# GJD_AI_World — Portfolio of Gaddangi Jaman Dora

Personal portfolio site: "Turn Ideas into Applications. Turn Applications into Impact."

Built with TanStack Start (React 19 + TypeScript + Tailwind CSS v4).

## Open it in VS Code

1. Unzip this folder somewhere you can find it, e.g. `C:\Users\you\Projects\gjd-ai-world`
   or `~/Projects/gjd-ai-world`.
2. In VS Code: **File → Open Folder…** and pick that folder.
3. Open the terminal inside VS Code (menu **Terminal → New Terminal**) and run:

```sh
npm install
npm run dev
```

4. Open the address it prints (usually http://localhost:5173) in your browser.

Prefer [Bun](https://bun.sh)? Then `bun install` and `bun run dev` — the
`bun.lock` file in this folder is ready for it.

## Other commands

```sh
npm run build     # production build
npm run preview   # serve the built site locally
npm run lint      # code checks
npm run test      # run the tests
npm run format    # tidy up formatting
```

## What to edit

- **All your words, skills, projects, links, contact details** live in one file:
  `src/content/portfolio.ts`. Change text there and the site updates — no need
  to touch the design code.
- **Cover photo**: `src/assets/gjd_portfolio_cover.jpg`. Replace it with a new
  photo of the same name (keep the `.jpg` ending) and it appears on the front
  page automatically.
- **Colours, fonts, animations**: `src/styles.css`.
- **Page layout**: `src/routes/index.tsx` and the pieces in
  `src/components/portfolio/`.

## Notes

- The cover is a wide banner (1920×711). It always shows in full — never cut
  side to side — and fills the screen top to bottom; its own top and bottom
  edges blur out to cover the rest.
- Headings type themselves out letter by letter, and card rows slide
  right-to-left nonstop with a 3D tilt. Hovering a card row pauses it.
- Nothing here needs an account, API key or database: the site is fully static
  content, so it runs the same on your laptop and on any web host.
