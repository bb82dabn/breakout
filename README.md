# Breakout

A classic brick-breaking game with a synthwave neon aesthetic, built entirely in a single HTML file. Runs in any browser, deploys with Docker.

Play it, or let the built-in Q-learning AI bot play it for you.

## Features

**Gameplay**
- Paddle control via mouse, touch, or arrow keys
- Ball physics with angle-based paddle deflection
- 12-column brick grid with color-coded rows and point values
- Progressive difficulty across levels (more rows, faster ball)
- Score tracking, lives system, level progression

**Visuals**
- Synthwave perspective grid background
- Neon glow effects on bricks, paddle, and ball
- Ball trail with fade-out
- Orbitron font, pink/cyan/purple color palette
- Scanline overlay for a retro CRT feel

**Audio**
- Two embedded synth music tracks (no external files needed)
- Sound effects for brick hits, paddle bounces, wall hits, level clear, life lost, game over
- Independent mute controls for music and SFX
- Track switching mid-game

**Settings**
- Ball speed (3-9)
- Speed ramp per level (0-1)
- Paddle width (60-200px)
- Brick rows (2-10)

**AI Bot**
- Q-learning agent that teaches itself to play
- Configurable training runs (1-9999 games)
- Live stats: games played, epsilon, average score, best score
- Rolling score chart showing learning progress
- Toggle on/off mid-game

## Run it

### With Docker (recommended)
```bash
git clone https://github.com/bb82dabn/breakout.git
cd breakout
docker compose up -d
```
Open `http://localhost:3456`

### Without Docker
Just open `index.html` in a browser. That's it — everything is in one file.

## Architecture

The entire game lives in `index.html`:
- **CSS**: Neon color variables, glow effects, overlay styling, responsive layout
- **Canvas**: 840x500 HTML5 Canvas with custom rendering (synthwave grid, glowing bricks, ball trails)
- **Game engine**: Physics, collision detection, level progression, game state machine
- **Audio**: SFX and music tracks encoded as base64 WAV, embedded directly in JS
- **AI**: Q-learning bot with discretized state space (20x15 ball position, 2x2 ball direction, 20 paddle positions)
- **Docker**: Nginx on Alpine Linux serving static files

No build step. No dependencies. No frameworks.

## Controls

| Input | Action |
|---|---|
| Mouse / Touch | Move paddle |
| Arrow keys | Move paddle |
| Play button | Start / restart / next level |
| Mute button | Toggle music |
| Track button | Switch music track |
| Bot button | Toggle AI auto-play |

## License

MIT
