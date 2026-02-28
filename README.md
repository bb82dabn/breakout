# breakout

> A simple Breakout game for casual gamers, built with HTML5 Canvas and Docker

## Stack

- Docker
- Nginx
- HTML5 Canvas
- JavaScript
- CSS

## Description

Breakout is a classic arcade-style game where players control a paddle to bounce a ball and destroy bricks. Built with HTML5 Canvas and Docker, it's ideal for casual gamers looking for a nostalgic yet modern gaming experience. The game features a responsive dark theme with neon accents and includes score tracking, lives system, and restart functionality.

## Features

- ✅ HTML5 Canvas-based game with paddle, ball, and brick mechanics
- ✅ Responsive UI with dark theme and neon accents
- ✅ Docker containerization for easy deployment
- ✅ Score tracking and lives system
- ✅ Restart functionality and game state management
- ✅ Custom CSS styling for modern visual effects
- ✅ Mobile-friendly layout with responsive design

## Tech Stack

| Technology       | Role                     |
|------------------|--------------------------|
| Nginx            | Web server and reverse proxy |
| Docker           | Containerization         |
| HTML5 Canvas     | Game rendering           |
| JavaScript       | Game logic and interactivity |
| CSS              | Styling and animations   |
| Alpine Linux     | Base image for Docker container |

## Architecture

The project uses a monorepo structure with frontend assets served by Nginx in a Docker container. The Dockerfile configures Nginx to serve static files from the project directory, with custom configuration in `nginx.conf`. The game logic is implemented in `game.js` and styled with `styles.css`, both served as static assets. The `index.html` file provides the game interface and integrates all components.

## Prerequisites

- Docker 20.10+
- Docker Compose 1.29+
- Git (for cloning the repository)

## Installation & Setup

```bash
git clone https://github.com/your-username/breakout.git
cd breakout
docker compose up -d
```

## Running

### Development
```bash
docker compose up
```

### Production
```bash
docker compose up -d
```

## Docker

```bash
docker compose up -d
```

## API Overview

This project does not include a backend API. It is a single-page application (SPA) that serves static files via Nginx.

## Environment Variables

No environment variables are required for this project. All configuration is handled through the Dockerfile and `nginx.conf`.
