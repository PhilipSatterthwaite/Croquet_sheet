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

The rows carry no words at all. A block of the ball's colour runs down the left
of each one, and the court below says where every ball is:

- **→** scores that ball's next point and moves it along the course. It turns
  into a **✓** when the ball is home.
- **−** takes that ball's last point back, along with the deadness that point
  cleared.
- **Undo**, at the bottom, reverses the last tap anywhere on the board —
  a wicket, a deadness circle, the end of the game — and keeps going back as
  far as you need.
- The thin bar along the bottom of each row is that ball's progress round the
  course.
- Under the rows is the **court**, with every ball sitting on the hoop it is
  playing for — **above** the hoop while it is heading out, **below** it on the
  way home. Balls sharing a hoop block up two abreast, and a ball comes off the
  court once it is home.

The game is saved to the phone after every tap, so closing the app, locking the
screen, or getting a phone call does not lose it. **New game** clears it.

### Deadness

The circles on each row are the other balls in play, one each. A live one is a
small dull dot; tap it and it swells to more than twice the size in full
colour, meaning that ball is now dead on that colour.

Size does the work, so the two states separate at a glance from arm's length.
The tap target stays a full 38px either way — only the dot inside it changes.

Scoring any point — wicket or post — puts all of that ball's circles back to
dots automatically.

**−** rewinds both together: the ball goes back a point and its circles return
to exactly what they were before it scored. Marks made *after* the point are
discarded with the point itself. **Undo** does the same, one tap at a time.

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

### Why nine hoops carry fourteen wicket points

The court is a double diamond, drawn long-axis across so it fits under the
rows. **Home is on the right**, where the balls start; they run out to the
left and come back. Two diamonds share the centre hoop:

```
                5              3
   ●    6·9   4·11    2·13   1·14    ●
turning                             home
               10             12
```

The outbound leg runs one side of each diamond and the return leg runs the
other, so most hoops answer to two numbers — hoop `2·13` is wicket 2 on the way
out and wicket 13 on the way home. That is why five hoops are run twice and
four once: 5×2 + 4 = 14.

Those numbers are *not* drawn on the diagram — the position of a ball says
which leg it is on. Outbound-only hoops are the top row and return-only hoops
the bottom row, and each ball sits above its hoop going out, below it coming
home. So a hoop that serves both legs can carry two separate blocks of balls at
once, one above and one below.

The layout lives in `COURT` beside `COURSE`. Each entry is an `x`/`y` fraction
of the box plus `pts`, the course points that hoop is. Every point from 0 to 15
must be claimed by exactly one hoop or post, or a ball would have nowhere to
stand.

## Colour

The app runs on a light ground — a very pale grey page with white cards. That
is what gives the black ball its contrast: as a block of `#363D47` on white it
sits at about 11:1, where on the old dark background it was a hole in the page.

Each ball in `META` carries three colours:

| | |
|---|---|
| `hex` | the fill — the block, the arrow button, the dot on the court |
| `fg` | text drawn *on* that fill, so it must clear 4.5:1 against `hex` |
| `ring` | the edge, and it must be **darker** than `hex` |

The edge rule is the one worth remembering. On a dark background an edge has to
be lighter than its ball; on this one it has to be darker, because the colour
that struggles against white is yellow, not black. Yellow's fill is only 1.7:1
against a card — the `#8A6C05` edge at 5:1 is what holds its shape.

The test suite measures all of this rather than trusting the eye: every `fg`
against its `hex`, every `ring` against a card, and every text token against
its background. Darkening red from `#E03A2F` to `#D9342A` came out of that
check — white on the old red was 4.4:1.

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
