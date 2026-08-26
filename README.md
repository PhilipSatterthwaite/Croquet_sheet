# Croquet

A wicket-by-wicket scorekeeper for the lawn. One HTML file, no build step, no
server — the same shape as the LED controller app.

## Put it on GitHub Pages

From this folder:

```sh
git init
git add .
git commit -m "Croquet scorekeeper"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.
A minute later it is live at `https://<you>.github.io/<repo>/`.

If you would rather drop it into an existing repo, put these files in a
subfolder — everything is referenced with relative paths, so it works from any
depth.

## Install it on a phone

Open the Pages URL **over https** (a `file://` copy cannot be installed).

- **iPhone** — Share → Add to Home Screen.
- **Android** — the ⋮ menu → Install app / Add to Home screen.

It launches full screen with no browser chrome, and the service worker
precaches everything, so it keeps working out on the lawn with no signal.

## Using it

Pick the course, the number of balls, and whether you are playing partners or
cutthroat. Names are optional.

- **Ran #4** — scores that ball's next point and moves it along the course.
- **−** — takes a point back.
- **Next turn** — passes play to the next ball in the rotation, skipping any
  that have staked out.
- Tap any ball's card (or its dot in the top bar) to hand it the turn directly,
  for when you are catching up two shots late.
- **Undo** reverses the last thing that happened, whatever it was — including
  the end of the game.

The game is saved to the phone after every tap, so closing the app, locking the
screen, or getting a phone call does not lose it. **New game** clears it.

### Deadness

Six-wicket only. Each card gets a row of chips for the other balls; tap one
when you are dead on it. Running a wicket clears that ball's deadness
automatically — hitting the stake does not.

## The courses

| | Points | Order |
|---|---|---|
| **Nine wicket** | 16 | #1–#7, turning stake, #8–#14, home stake |
| **Six wicket** | 13 | #1–#6, #1-back–#6-back, stake |

Both are defined as a single list in `COURSE` at the top of the `<script>` in
[index.html](index.html) — a ball's entire state is how far down that list it
has got, so changing the list is all it takes to match a different set of house
rules.

## Files

| | |
|---|---|
| `index.html` | the whole app — markup, styles, logic |
| `manifest.webmanifest` | makes it installable; bump `?v=` if you rename it |
| `sw.js` | offline cache — **bump `CACHE` when you change `index.html`**, or installed phones keep the old version |
| `icon.svg` | home-screen icon |
| `.nojekyll` | stops GitHub Pages running the files through Jekyll |
