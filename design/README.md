# Meridian — styling review and redesign

Source for the design canvas at https://claude.ai/artifact/UgM6ndMB37RWothjpLtwqU

Each `.dc.html` is one artboard; `canvas.json` places them. `meridian-redesign.html`
is the built canvas — regenerate it rather than editing it by hand.

| Artboard | What it is |
|---|---|
| `Audit.dc.html` | Ten findings against the current `globals.css` / `page.tsx` styling |
| `Main.dc.html` | Direction A "Instrument" — desktop, 1600×1000 |
| `Mobile.dc.html` | Direction A — phone, 390×844 |
| `Tokens.dc.html` | Direction A — colour, type, geometry, motion, primitives |
| `Broadsheet.dc.html` | Alternate B — light chrome, editorial serif |
| `Terminal.dc.html` | Alternate C — monochrome brutalist, maximum density |
| `Signal.dc.html` | Alternate D — acid accent, giant figures, broken grid |

## Direction A in one paragraph

Warm near-black paper instead of blue-black. One *cold* brand accent (jade
`#35D6B5`) so that warm hues are free to mean only escalation — today gold is
both the brand and reads as caution, which is why alerts have no colour of their
own. No backdrop blur and no coloured glows: opaque surfaces, 1px hairlines, one
neutral elevation token. Archivo for interface, IBM Plex Mono for figures and
machine identifiers only. Six floating chrome islands collapse into three docks
(top bar, left column, bottom strip) with the inspector appearing on selection,
so the globe gets three clean edges.

## The cheap first commit, if A is adopted

1. Delete the global `* { transition: ... .6s }` rule in `globals.css`; scope
   transitions to interactive elements at 140ms, panels at 240ms.
2. Rename tokens to intent — `--signal`, `--surface-2`, `--escalation` — so a
   theme is a decision rather than `--gold-primary: #B388FF`.
3. Raise the type floor to 11px and cut tracking to a single 0.1em value.

Sample values in the artboards (entity counts, callsigns, the Hormuz figures)
are for layout only. They are not live data.
