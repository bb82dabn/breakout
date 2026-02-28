# breakout

A classic brick-breaking arcade game served via Docker, playable in any modern browser.

## Description

Breakout is a browser-based implementation of the classic brick-breaking game, featuring paddle control, ball physics, and multiple rows of colorful bricks. It solves the problem of providing a lightweight, visually appealing, and easily deployable retro game experience using only static assets served by Nginx in a Docker container.

## Features

- Single-page game playable in any modern browser
- Paddle control via mouse, touch, and keyboard arrow keys
- Ball physics with angle-based deflection on paddle hits
- 5 rows × 10 columns of color-coded bricks with collision detection
- Score tracking and lives system (3 lives)
- Restart button to reset the game state
- Synthwave neon aesthetic with glowing bricks, paddle, and ball
- Responsive canvas layout with scanline overlay effect
- Static asset serving via Nginx in a lightweight Alpine Linux Docker container

## Tech Stack

| Technology       | Role                          |
|------------------|-------------------------------|
| HTML5 Canvas     | Game rendering and UI          |
| JavaScript       | Game logic, physics, input handling |
| CSS              | Styling and neon visual effects |
| Nginx (stable-alpine) | Static file web server inside Docker |
| Docker           | Containerization and deployment |

## Architecture

The project consists of a single-page frontend game (`index.html`, `styles.css`, `game.js`) served as static files by an Nginx web server running inside a Docker container. The Dockerfile builds the container by copying the custom Nginx configuration and game assets into the image. The `docker-compose.yml` file defines a single service exposing port 3456 on the host, forwarding to port 80 inside the container.

- `index.html`: Main game page with embedded canvas and UI elements
- `styles.css`: Styling for neon synthwave theme and layout
- `game.js`: Game logic including paddle, ball, bricks, collision detection, scoring, and input handling
- `nginx.conf`: Custom Nginx configuration serving static files
- `Dockerfile`: Builds the Nginx container image with game files
- `docker-compose.yml`: Defines and runs the container with port mapping

## Prerequisites

- Docker Engine 20.10+  
- Docker Compose 1.29+  
- Modern web browser (Chrome, Firefox, Edge, Safari)

## Installation & Setup

Clone the repository and start the container:

```bash
git clone https://github.com/bb82dabn/breakout.git
cd breakout
docker compose up -d
```

This builds the Docker image using the provided Dockerfile and launches the container named `breakout`.

## Running

### Development

No explicit development server or build step exists. To test locally without Docker, simply open `index.html` in a modern browser.

### Production

Run via Docker as described above. The game is served on `http://localhost:3456`.

## Docker

The project includes a `docker-compose.yml` file with the following service:

- **breakout**: Builds from the local Dockerfile, runs Nginx serving the game on port 80 inside the container, mapped to port 3456 on the host.

Commands:

- Start container in detached mode:

  ```bash
  docker compose up -d
  ```

- Stop container:

  ```bash
  docker compose down
  ```

- View container logs:

  ```bash
  docker logs breakout
  ```

## API Overview

No backend API exists. The project is a static frontend game served by Nginx.

## Environment Variables

No environment variables are used or required by this project.

---

# Additional Notes

- The game canvas is 840×500 pixels.
- Paddle width is fixed at 140px.
- The ball has a radius of 10px and moves with velocity components updated each animation frame.
- The brick grid consists of 5 rows and 10 columns with padding and offset for layout.
- The Nginx configuration replaces the default with a custom `nginx.conf` to serve the static files.
- The Docker image is based on `nginx:stable-alpine` for minimal size and security.
- The project includes a `before-bot.png` image asset (not referenced in code, likely for documentation or UI).
