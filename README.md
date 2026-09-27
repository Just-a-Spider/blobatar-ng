# @just-a-spider/blobatar-ng

[![npm version](https://img.shields.io/npm/v/@just-a-spider/blobatar-ng.svg)](https://www.npmjs.com/package/@just-a-spider/blobatar-ng)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Angular adapter for [blobatar](https://github.com/Alain00/blobatar) — deterministic geometric avatars from any string. Built with modern Angular signals, standalone components, SSR safety, dual-mode SVG/IMG rendering, and optional gaze tracking.

Designed both as a standalone library (`@just-a-spider/blobatar-ng`) and as an upstream contribution candidate for `@blobatar/angular`.

---

## Features

- **Deterministic**: Same input string produces identical geometric faces across all platforms.
- **Dual-Mode Rendering**:
  - **Static**: Renders optimized `<img>` with SVG data-URI. Ideal for high-density lists/tables with zero DOM overhead.
  - **Animated / Expressive**: Renders inline `<svg>` with CSS variables for fluid state transitions and morphing.
- **Signal-Powered**: Modern Angular input signals (`input()`, `computed()`) with `ChangeDetectionStrategy.OnPush`.
- **Gaze Tracking**: Built-in reactive pointer tracking via `blobatar/gaze` with safe browser lifecycle hooks (`effect`, `isPlatformBrowser`).
- **SSR & Hydration Safe**: No window/DOM errors during server-side rendering or prerendering.
- **Content Projection**: Allows custom SVG elements or badges via `<ng-content>`.

---

## Installation

```bash
# Using pnpm
pnpm add @just-a-spider/blobatar-ng blobatar

# Using npm
npm install @just-a-spider/blobatar-ng blobatar

# Using yarn
yarn add @just-a-spider/blobatar-ng blobatar
```

### Motion and Gaze Styles

If using animated blobatars (`animate="always"` or `animate="hover"`) or gaze tracking (`[gaze]="true"`), include the upstream styles in your global stylesheet (e.g. `src/styles.scss`):

```scss
@import 'blobatar/motion.css';
@import 'blobatar/gaze.css'; // Optional: only needed if using gaze tracking
```

---

## Quick Start

Import `BlobatarComponent` directly in your standalone component:

```typescript
import { Component } from '@angular/core';
import { BlobatarComponent } from '@just-a-spider/blobatar-ng';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [BlobatarComponent],
  template: `
    <!-- Static avatar (renders as <img>) -->
    <blobatar name="user@example.com" [size]="48" />

    <!-- Animated avatar with squircle background -->
    <blobatar
      name="alain"
      [size]="64"
      background="squircle"
      animate="always"
      expression="happy"
    />

    <!-- Interactive avatar with pointer gaze tracking -->
    <blobatar
      name="mascot"
      [size]="96"
      [animate]="true"
      [gaze]="true"
      expression="thinking"
    />
  `,
})
export class UserProfileComponent {}
```

---

## Component API

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `config` | `BlobatarCustomConfig` | `undefined` | Preset configuration object (combines seed, palette, traits, expression, etc.). |
| `name` | `string` | `'blobatar'` | The seed string (username, email, id, hash). Same name = same avatar. |
| `seed` | `string \| undefined` | `undefined` | Backwards-compatible alias for `name`. |
| `size` | `number` | `36` | Avatar dimensions in pixels (width and height). |
| `bgColor` | `string \| undefined` | `undefined` | Direct background color fill (e.g. `'#f3f1fd'`). Auto-enables squircle backdrop. Alias: `bg`. |
| `bg` | `string \| undefined` | `undefined` | Shorthand alias for `bgColor`. |
| `animate` | `boolean \| 'always' \| 'hover'` | `false` | Enables idle motion. `'hover'` animates on hover; `'always'` or `true` loops continuously. |
| `expression` | `Expression \| BlobatarExpressionName \| string` | `undefined` | Named expression (`'happy'`, `'thinking'`, `'smug'`, `'wink'`, etc.) or custom Expression object. |
| `gaze` | `boolean \| 'pointer'` | `false` | Enables cursor/pointer gaze tracking via `blobatar/gaze`. |
| `background` | `'squircle' \| 'circle' \| 'square' \| boolean` | `undefined` | Shape container clipping or `false` for transparent. |
| `palette` | `{ head?: string; eye?: string; bg?: string }` | `undefined` | Color palette hex overrides. |
| `hue` | `number` | `undefined` | Base hue shift (0–360). |
| `tone` | `number` | `undefined` | Skin tone index. |
| `traits` | `Record<string, any>` | `undefined` | Deep geometric trait overrides (shapes, nubs, eyes). |
| `normalize` | `boolean` | `undefined` | Normalizes input string casing/trimming. |
| `contrast` | `number` | `undefined` | Contrast adjustment. |
| `title` | `string` | `undefined` | Accessible image title / tooltip. |
| `alt` | `string` | `undefined` | Image alt text (for static `<img>` mode). |

---

## Expressions

You can specify expressions by string name or import them directly:

```typescript
import { BLOBATAR_EXPRESSIONS, type BlobatarExpressionName } from '@just-a-spider/blobatar-ng';

// Available expression names:
// 'happy', 'idle', 'love', 'mad', 'sad', 'scared', 'shy',
// 'sick', 'sleepy', 'smug', 'surprised', 'thinking', 'unsure', 'wink'
```

---

## Custom SVG Content Projection

Any child SVG elements inside `<blobatar>` will be projected inside the animated `<svg>` root:

```html
<blobatar name="creative" [animate]="true">
  <!-- Custom badge or adornment -->
  <svg:circle cx="85" cy="85" r="12" fill="#10b981" />
</blobatar>
```

---

## Building & Publishing

```bash
# Build the library to dist/blobatar-ng
pnpm ng build blobatar-ng

# Run unit tests
pnpm ng test blobatar-ng --watch=false

# Publish to npm registry
cd dist/blobatar-ng
npm publish --access public
```

---

## Contributing Upstream

To contribute to `Alain00/blobatar` as `@blobatar/angular`:
1. Move the `src/` files under `packages/angular/` in the upstream monorepo.
2. Update `peerDependencies` to `blobatar: "workspace:*"`.
3. Add tests matching the React/Vue adapter test harnesses.

---

## License

MIT
