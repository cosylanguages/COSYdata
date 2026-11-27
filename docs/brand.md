# Brand and colour rules

COSYdata is part of the COSY Languages ecosystem but a separate repository. It
carries the ecosystem palette and adds nothing of its own.

## The two brand colours

| Token | Value | Role |
| --- | --- | --- |
| `--cosy-signal` | `#0ABBB5` | Primary. The colour of the COSY mark. |
| `--cosy-signal-secondary` | `#0CA2B0` | Secondary. Used next to the primary, never alone. |
| `--cosy-signal-gradient` | `135deg, #0ABBB5 → #0CA2B0` | Fills: primary buttons, active states, chart bars. |
| `--cosy-signal-deep` | `#087A80` | Text and borders on light backgrounds (5.11:1 on white). |
| `--cosy-on-signal` | `#06201F` | Text placed on the gradient (7.2:1). |

Everything else (cream, ink, borders, shadows, radii, type) comes from
`shared/vendor/tokens.css`. Never write a hex value in a page stylesheet: if a
colour is missing, it belongs in tokens.

## Two accents, two jobs

The repository already used honey-gold before the brand pass, and it still does,
because the two accents answer different questions:

- **Honey-gold is editorial.** The eyebrow pill, the italic word in the headline.
  It marks voice and emphasis.
- **The brand signal is interactive.** Buttons, links, chip hovers, focus rings,
  active tabs, progress bars, table header rules, badges.

A visitor learns this without being told: warm means "read this", teal means
"this responds to you". Mixing them, or using teal for large background blocks,
loses that signal.

## Where the signal must appear

- primary buttons and their hover state
- link underlines and link hover
- `:focus-visible` outlines on every interactive element
- active or pressed states (selected language, current tab)
- bars, meters and any chart that encodes data
- section rules in long-form pages
- small badges and eyebrows in data contexts

## Where it must not

- page or section backgrounds
- body text
- large cards

Turquoise in small doses reads as brand. Turquoise in large doses reads as a
template.

## Contrast

`--cosy-signal-deep` on light and `--cosy-signal` on dark both clear 4.5:1 for
text. `--cosy-on-signal` on the gradient clears 7:1. When adding an accent,
check it in both themes: `shared/hero.css` and `products/statistics/statistics.css`
each define one `--*-accent` variable and flip it once under
`html[data-theme="dark"]`, rather than repeating dark overrides per rule.

## Vendored components keep their owner's palette

The ecosystem strip, the daily strip and the daily directory are vendored from
COSYlanguages and pinned by checksum (see `docs/independence.md`). They carry the
palette of their owning repository, including sage, and are not restyled here.
That is deliberate: a component that looks different in each host is worse than a
component that looks foreign in one.
