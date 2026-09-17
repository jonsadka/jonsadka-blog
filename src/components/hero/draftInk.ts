// The colours of the hero's spec side, built in OKLCH.
//
// The site's palette is one hue: every gray it uses (gray-50 to gray-950, the graphite ink) sits
// between hue 248 and 265 at chroma 0.034 or less, and the drawing's ultramarine ink sits at 264.6.
// The draft ink keeps that hue and raises the chroma, which ties it to the page while setting it
// apart from the built side's near-neutral grays. Every text pair clears APCA: Lc 75 for type and
// code, 45 for comments, 30 for dashed lines.

const INK = 'oklch(0.4 0.221 264.6)';

export const DRAFT_INK = {
  // The sheet is the page's own #E5E5E5
  ground: 'oklch(0.922 0 0)',
  gridMajor: 'oklch(0.84 0.028 264.6)',
  gridMinor: 'oklch(0.885 0.014 264.6)',
  // Fill inside the dashed card
  card: 'oklch(0.95 0.004 264.6)',
  // Dashed outlines and dimension lines
  line: 'oklch(0.6 0.173 264.6)',
  // Drawn type, callouts, values in the code, and the divider
  ink: INK,
  // Text set on the ink
  onInk: 'oklch(0.985 0.001 264.6)',
  // The page's grays for the code: gray-700 identifiers, gray-900 keywords, gray-500 comments
  code: {
    text: 'oklch(0.373 0.034 259.7)',
    strong: 'oklch(0.21 0.034 264.7)',
    faint: 'oklch(0.551 0.027 264.4)',
  },
};
