# Croquet

A wicket-by-wicket scorekeeper for the lawn. One HTML file, no build step, no
server — the same shape as the LED controller app.

**Live: <https://philipsatterthwaite.github.io/Croquet_sheet/>**

## Install it on a phone

Open <https://philipsatterthwaite.github.io/Croquet_sheet/> **over https** — a
`file://` copy cannot be installed.

- **iPhone** — Share → Add to Home Screen.
- **Android** — the ⋮ menu → Install app / Add to Home screen.

It launches full screen with no browser chrome, and the service worker
precaches everything, so it keeps working out on the lawn with no signal.

## Using it

Tap the colours to set which balls are in play — all six start lit, and you can
switch off any you are not using down to a minimum of two. Then pick the sides
on the right.

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

### Sides

Teams are cut **across** the rotation rather than along it, the way partners
alternate on a real lawn:

| Balls | Sides | Split |
|---|---|---|
| 6 | 2 teams | Blue · Black · Green vs Red · Yellow · Orange |
| 6 | 3 teams | Blue·Yellow, Red·Green, Black·Orange |
| 4 | 2 teams | 1st · 3rd vs 2nd · 4th of whatever colours are lit |

A side wins when *all* of its balls have staked out. With **No teams** it is
cutthroat and the first ball home wins.

Splits have to divide evenly, so an odd number of balls disables both team
options, and 3 teams needs the full six. Choosing a split that a later change
invalidates drops you back to No teams.

### Deadness

Off by default; flip it on at setup if you play the one-roquet-per-ball rule.
Each card then gets a row of chips for the other balls — tap one when you are
dead on it. Running a wicket clears that ball's deadness automatically; hitting
a stake does not.

## The course

Nine wicket, 16 points: **#1–#7, turning stake, #8–#14, home stake.**

It is a single list called `COURSE` at the top of the `<script>` in
[index.html](index.html) — a ball's entire state is how far down that list it
has got, so editing the list is all it takes to match a different set of house
rules.

## Files

| | |
|---|---|
| `index.html` | the whole app — markup, styles, logic |
| `manifest.webmanifest` | makes it installable; bump `?v=` if you rename it |
| `sw.js` | offline cache — **bump `CACHE` when you change `index.html`**, or installed phones keep the old version |
| `icon.svg` | home-screen icon |
| `.nojekyll` | stops GitHub Pages running the files through Jekyll |

## Publishing

Served by GitHub Pages from `main` / `/ (root)`
(**Settings → Pages**), so a push to `main` is a deploy:

```sh
git add -A && git commit -m "..." && git push
```

Give it a minute after pushing. Everything is referenced with relative paths,
so the app also works from a subfolder of some other repo if you ever move it.
