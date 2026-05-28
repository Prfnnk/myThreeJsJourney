# Garden Scene

A Three.js interactive garden game built with a modular architecture pattern.

## Overview

Plant radishes, watch them grow, and harvest them into your basket! Click on empty holes to plant seeds, wait 5 seconds for them to grow into radishes, then click again to harvest them.

## Features

- 3D garden with interactive clicking mechanics
- Radish growth animation (5-second growth cycle)
- Harvesting system with flying animation to basket
- Responsive design with fullscreen 3D rendering
- Modular code structure based on the Three.js Journey course

## Architecture

```
src/
├── script.js                 # Entry point
├── index.html               # HTML template
├── style.css                # Styles
└── Experience/
    ├── Experience.js        # Main experience class (singleton)
    ├── Camera.js            # Camera setup
    ├── Renderer.js          # WebGL renderer
    ├── Utils/
    │   ├── EventEmitter.js  # Event system
    │   ├── Time.js          # Time management
    │   ├── Sizes.js         # Window sizing
    │   ├── Debug.js         # Debug utilities
    │   └── Resources.js     # Resource loading
    └── World/
        ├── World.js         # World container
        └── Garden.js        # Garden game logic
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The dev server will start on `http://localhost:5173`

## Building

```bash
npm run build
```

## Gameplay

1. **Plant**: Click on an empty hole (dark circle) in the garden
2. **Grow**: Wait 5 seconds as your radish grows from a sprout to a mature plant
3. **Harvest**: Click on the ready radish to harvest it
4. **Score**: Watch your harvest count increase as radishes fly to the basket

## Controls

- **Mouse Click**: Plant seeds or harvest radishes
- **Mouse Hover**: Cursor changes to pointer over plantable/harvestable cells

## Physics & Animations

- Plants grow through two phases: sprout (0-40% of time), then radish (40-100%)
- Harvested radishes follow a cubic ease-out trajectory to the basket
- Ready plants subtly bob up and down with a sine wave animation
- Radishes rotate and scale down as they fly away

## Customization

Edit constants in `src/Experience/World/Garden.js`:

```javascript
const GRID = 3; // 3x3 grid of cells
const CELL_SIZE = 1.4; // Size of each cell
const GROW_MS = 5000; // Growth time in milliseconds
```
