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

Every ball then gets one line, so a full six-ball game sits on the screen at
once. There is no turn order to keep up with — tap whichever ball just scored.

- **Wicket 4** — the button on each row names the point that ball is playing
  for. Tap it when the ball scores, and it rolls on to the next one. At the
  ends of the course it reads **Turning post** and **Home post**.
- **−** — takes that ball's last point back.
- **Undo**, at the bottom, reverses the last thing that happened anywhere on
  the board, whatever it was — including the end of the game.
- The thin bar along the bottom of each row is that ball's progress round the
  course.

The game is saved to the phone after every tap, so closing the app, locking the
screen, or getting a phone call does not lose it. **New game** clears it.

### Deadness

The circles on each row are the other balls in play, one each. They sit dark
until you tap one, which lights it up: that ball is now dead on that colour.
Running a wicket puts all of that ball's circles out again automatically —
hitting a post does not.

The marks are per row. Lighting Red on Blue's line says nothing about Red's.

### Sides

Sides decide only who wins; they have no effect on play. Teams are cut
**across** the ball order rather than along it, the way partners alternate on a
real lawn:

| Balls | Sides | Split |
|---|---|---|
| 6 | 2 teams | Blue · Black · Green vs Red · Yellow · Orange |
| 6 | 3 teams | Blue·Yellow, Red·Green, Black·Orange |
| 4 | 2 teams | 1st · 3rd vs 2nd · 4th of whatever colours are lit |

A side wins when *all* of its balls are home. With **No teams** it is cutthroat
and the first ball home wins.

Splits have to divide evenly, so an odd number of balls disables both team
options, and 3 teams needs the full six. Choosing a split that a later change
invalidates drops you back to No teams.

## The course

Nine wicket, 16 points: **wickets 1–7, turning post, wickets 8–14, home post.**

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
