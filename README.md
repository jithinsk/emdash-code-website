# emdash-code-website

Documentation site for [emdash-header-footer-code](https://github.com/jithinsk/emdash-header-footer-code), the EmDash plugin that adds code snippets to the head or body of your pages.

Live at **https://emdash-code.jithins.dev**.

Built with [Astro Starlight](https://starlight.astro.build) and deployed on Cloudflare Pages.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

Pages live in `src/content/docs/`. The sidebar is in `astro.config.mjs`.

## Deploy

Cloudflare Pages builds every push to `main`:

| Setting          | Value           |
| ---------------- | --------------- |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node version     | 22 (`.node-version`) |

## Licence

MIT
