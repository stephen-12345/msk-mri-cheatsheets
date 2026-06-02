# How to add more "How to describe it" flashcards

These are the cards at the heart of the app: a finding on the front, and the
**exact sentence you'd dictate** on the back, in proper MRI report language.

All of them live in one file:

```
trainer/describe-cards.js
```

You add cards by adding objects to the list in that file. You don't need to
touch anything else — they automatically flow into the flashcard deck and the
spaced-repetition scheduler.

---

## The card format

Each card is one object:

```js
{
  id:    "d301",                                   // any unique id, just keep the d-prefix
  front: "How would you describe a complete ACL tear?",
  find:  "Complete discontinuity of the ACL fibers with abnormal horizontal fiber orientation, intercondylar edema, and pivot-shift bone contusions of the lateral femoral condyle and posterolateral tibial plateau.",
  impr:  "Complete (full-thickness) ACL tear.",
  pearl: "Secondary signs: anterior tibial translation, buckled PCL, Segond fracture.",
  topic: "Cruciate ligaments",
  joint: "knee"
}
```

| Field   | Required | What it is |
|---------|----------|------------|
| `id`    | yes | Unique string. Keep the `d` prefix (`d301`, `d302`, …) so it never collides with the terminology deck (`f1`, `f2`, …). |
| `front` | yes | The prompt. Always phrase it as a question: **"How would you describe a …?"** |
| `find`  | yes | The **Findings** line — renders next to an orange **F:**. This is the dictation itself. |
| `impr`  | no  | The **Impression** line — renders next to a green **I:**. One concise diagnosis. |
| `pearl` | no  | A teaching note — secondary signs, a grading system, a mimic, or a pitfall. Renders in a blue box with a 💡. |
| `topic` | yes | Short label shown above the card (e.g. "Rotator cuff"). |
| `joint` | yes | One of: `shoulder`, `knee`, `hip`, `ankle`, `foot`, `elbow`, `wrist`, `hand`, `spine`, `tumor`, `general`. Drives the topic filter and the coverage heatmap. |

### Bracket placeholders

Put interchangeable options in **square brackets with slashes** and they render
as little amber chips:

```
"find": "Focal thickening and increased T2 signal within the [proximal/mid/distal] PCL with partial fiber disruption..."
```

shows up as …within the `[proximal/mid/distal]` PCL… — handy for "fill in which
part you saw."

---

## What makes a *good* `find` line

The whole point is expert phrasing, so the `find` line should read like an
attending dictating — not like a textbook definition. Aim to include:

1. **Signal** — `T2 hyperintense`, `fluid signal`, `T1 hypointense`, `STIR / fluid-sensitive`, `intrasubstance intermediate signal`.
2. **Morphology** — discontinuity, fiber disruption, thickening, attenuation, fraying, wavy/lax contour.
3. **Location** — name the exact structure, surface, zone, or compartment.
4. **A measurement** — mm / cm / % of thickness / degrees. Always quantify when real.
5. **Named signs** — Segond, ghost sign, double-PCL, Terry-Thomas, T sign, empty groove, double-line, etc.
6. **Secondary signs** — the supporting findings that confirm it (put these in `pearl` if the `find` line gets long).

Good: *"Complete discontinuity of the ACL fibers with abnormal horizontal fiber
orientation, intercondylar edema, and pivot-shift bone contusions of the lateral
femoral condyle and posterolateral tibial plateau."*

Weak: *"The ACL is torn."* (no signal, no morphology, no secondary signs)

---

## Two ways to add cards

### A. Just ask Claude (easiest)
Give a list of entities or a topic, e.g.:

> "Add describe-cards for: posterior labral tear, reverse Hill-Sachs, SLAP type IV,
> teres minor denervation. Shoulder."

Claude writes the objects (correct schema, ids, accurate phrasing), drops them
into `describe-cards.js`, validates, and deploys. You can paste a whole reading
list — it scales to hundreds.

### B. Edit the file yourself
1. Open `trainer/describe-cards.js`.
2. Copy the template below, fill it in, and paste it inside the `concat([ ... ])`
   list (comma-separate entries).
3. Save. Tell Claude "deploy the new cards" (it bumps the offline cache and pushes
   to GitHub Pages), or run the deploy yourself if you know git.

```js
{
  id: "dXXX",
  front: "How would you describe a ___?",
  find:  "___",
  impr:  "___",
  pearl: "___",          // optional — delete this line if unused
  topic: "___",
  joint: "knee"
}
```

That's it. Every card you add is automatically scheduled by the spaced-repetition
engine and counts toward the deck total and topic filters.
