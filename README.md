# breakout

Classic brick-breaking arcade game playable in any modern browser, packaged for easy Docker deployment.

## Description

Breakout is a browser-based implementation of the classic brick-breaking game. It features paddle control, ball physics, and multiple rows of colorful bricks, providing an engaging retro arcade experience. The game is served as static assets by an Nginx server inside a Docker container, enabling straightforward deployment and play on any platform with Docker support.

## Features

- Single-page game playable in any modern web browser  
- Paddle control via keyboard arrow keys and mouse dragging  
- Ball physics with angle-based deflections upon paddle collisions  
- Brick grid of 5 rows × 10 columns with color-coded bricks and collision detection  
- Score tracking system awarding 10 points per brick destroyed  
- Three-lives system with game over and restart functionality  
- Restart button to reset the game state at any time  
- Synthwave neon aesthetic with glowing bricks, paddle, and ball  
- Responsive canvas layout with a scanline overlay effect for retro ambiance  
- Static asset serving by Nginx using a custom configuration (`nginx.conf`)  
- Dockerized deployment with Alpine-based Nginx container  
- Docker Compose setup exposing the game on host port 3456  

## Tech Stack

| Technology           | Role                                   |
|----------------------|---------------------------------------|
| HTML5 Canvas         | Game rendering and UI                  |
| JavaScript           | Game logic, physics, input handling   |
| CSS                  | Styling and neon visual effects        |
| Nginx (stable-alpine)| Static file web server inside Docker  |
| Docker               | Containerization and deployment        |
| Docker Compose       | Container orchestration and networking |

## Architecture

The project consists of a static frontend game served by an Nginx web server running inside a Docker container:

- `index.html`: Main HTML page containing the canvas element, HUD (score, lives, status), and UI layout  
- `styles.css`: Stylesheet implementing the neon synthwave theme and responsive layout  
- `game.js`: JavaScript file handling game logic including paddle movement, ball physics, brick grid creation, collision detection, scoring, lives, and restart functionality  
- `nginx.conf`: Custom Nginx configuration replacing the default to serve static files from `/usr/share/nginx/html`  
- `Dockerfile`: Builds the Docker image based on `nginx:stable-alpine`, copies the custom config and game assets  
- `docker-compose.yml`: Defines a single service `breakout` that builds the Docker image and exposes port 3456 on the host mapped to port 80 in the container  

The game runs entirely client-side in the browser; Nginx serves the static assets without any backend API or dynamic server logic.

## Prerequisites

- Docker Engine version 20.10 or higher  
- Docker Compose version 1.29 or higher  
- Modern web browser (Chrome, Firefox, Edge, Safari) capable of running HTML5 Canvas and JavaScript ES6+

## Installation & Setup

Clone the repository and start the Docker container:

```bash
git clone https://github.com/bb82dabn/breakout.git
cd breakout
docker compose up -d
```

This command builds the Docker image using the provided Dockerfile and launches the container named `breakout`.

## Running

### Development

No dedicated development server or build system is included. To test locally without Docker, open `index.html` directly in a modern browser.

### Production

Run the game inside the Docker container as described above. Access the game at:

```
http://localhost:3456
```

## Docker

The project includes a `docker-compose.yml` file defining the following service:

- **breakout**: Builds the Docker image from the local Dockerfile, runs Nginx serving the static game files on port 80 inside the container, mapped to port 3456 on the host machine.

Common Docker Compose commands:

- Start the container in detached mode:

  ```bash
  docker compose up -d
  ```

- Stop the container:

  ```bash
  docker compose down
  ```

- View container logs:

  ```bash
  docker compose logs -f
  ```

## API Overview

This project does not include any backend API or dynamic server logic. It serves static frontend assets only.

## Environment Variables

This project does not require or use any environment variables. All configuration is static and embedded in the Dockerfile and Nginx configuration.
