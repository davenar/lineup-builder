# ⚽ Lineup Builder

A football lineup builder inspired by tools like Futbin. Pick a formation, search real players, and assemble your squad on an interactive pitch — with a bench, drag & drop, multiple card themes, and persistent lineups.

Built with **Angular 21** and **Tailwind CSS 4** as a learning project and portfolio piece.

> **Disclaimer** — This is an unofficial, non-commercial project made for educational purposes. It is not affiliated with, endorsed by, or connected to EA Sports, FIFA, or FIFACM. Player data and images are fetched from publicly accessible, unauthenticated endpoints inspected on [fifacm.com](https://www.fifacm.com) and belong to their respective owners. They are used here for demonstration only.

## Features

- **25+ real formations** (4-4-2, 4-3-3, 3-5-2, 5-2-3, diamond variants…) with slot coordinates modeled on actual in-possession shapes, not just grid positions. Switching formation keeps players assigned to slots that still exist.
- **Player search** with debounced autocomplete (min. 3 characters), opened in a slide-in panel (right on desktop, bottom sheet on mobile).
- **Drag & drop** powered by Angular CDK: swap or move players between any two slots — pitch ↔ pitch, bench ↔ bench, and pitch ↔ bench — with full **touch support** and a custom fixed-size drag preview.
- **Card themes**: a clean "sticker" style and an animated "crazy-time" casino style (rotating conic-gradient borders, LED marquee name boards, glowing chips), selectable independently for pitch and bench.
- **Auto-scaling cards** built with CSS container queries (`cqw`/`cqh`/`cqmin` units), so cards stay proportional at any pitch size and on any device.
- **Marquee player names**: long names scroll automatically; overflow is detected with `ResizeObserver` + signal-based reactivity.
- **Regulation pitch**: field lines drawn as inline SVG at IFAB proportions (1 unit = 1 dm).
- **Persistence**: save, load, and clear your lineup via `localStorage`, including formation, players, card styles, and pitch background.
- **Custom design system**: a hand-rolled style guide (glass surfaces, glow effects, form controls, badges, panels, themed scrollbars) on top of Tailwind 4 theme tokens — browsable at the in-app style guide route.
- **Accessibility touches**: `aria-label`s on all icon actions, focus-visible rings, `prefers-reduced-motion` support on all animations.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Angular 21 (standalone components, signals, `input()`/`model()`, `@if`/`@for`/`@switch` control flow) |
| Styling | Tailwind CSS 4 (`@theme` tokens), custom utilities, component-scoped CSS for animations |
| Drag & drop | Angular CDK `DragDrop` (`cdkDropListGroup` + per-slot drop lists) |
| State | Signal-based service (`signal`, `computed`, readonly views) — no external state library |
| Data | Public unauthenticated endpoints (players, clubs, nations) |
| Persistence | `localStorage` with validation on load |

## Architecture notes

A few implementation details worth highlighting:

- **State lives in one injectable service** (`LineupStateService`) exposing readonly signals; components derive everything through `computed`. Pitch and bench assignments are `Map<number, Player>` snapshots replaced immutably, so swap/move between zones commits atomically.
- **Cards are theme-switched by a thin wrapper component** (`app-player-card-pitch` / `app-player-card-bench`) that reads the current style from state and delegates to the concrete themed component. Adding a new theme = adding one component + one `@case`.
- **Container queries over media queries** for card internals: each pitch slot is a size container, so a single set of `cqw`-based styles scales from mobile to desktop without breakpoint forks (breakpoints are only used to nudge font ratios).
- **Drag & drop is centralized in the builder page**: cards know nothing about DnD. Each slot is a `cdkDropList` carrying a typed `{ zone, index }` payload; a single `drop` handler delegates to the state service, which decides between swap and move.
- **A global panel system** (`PanelService` + host component) renders any component in a glass slide-in panel with configurable direction per breakpoint, close modes (button/backdrop/escape), and body scroll locking.

## Getting started

```bash
npm install
ng serve
```

Open `http://localhost:4200/`. The app reloads automatically on source changes.

### Build

```bash
ng build
```

Build artifacts are stored in `dist/`.

## License & attribution

Source code is available for learning purposes. All football data, player photos, club badges, and national flags are property of their respective owners — see the disclaimer above.