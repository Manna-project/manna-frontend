# Mannamap Frontend Design

## 1. Product Intent

Mannamap helps people choose a fair, convenient meeting place. The interface should feel calm, practical, and trustworthy: a map-adjacent planning tool, not a marketing splash page.

## 2. Typography

- Sans: Geist Sans via `--font-geist-sans`
- Mono: Geist Mono via `--font-geist-mono` for small numeric and route details
- Heading scale: `text-4xl` on mobile, `text-6xl` on desktop
- Body scale: `text-base` to `text-lg`

## 3. Color

- Background: `--background`, warm white `#fbfaf7`
- Foreground: `--foreground`, ink `#171717`
- Muted surface: `#f3f0ea`
- Accent: transit green `#1f7a4d`
- Accent strong: `#155c3a`
- Brand navy: `--brand-navy`, `#173b60`, used for the Mannamap wordmark to match the supplied location icon.
- Border: `#ded8cc`
- Error: `#b42318`

## 4. Spacing, Radius, Depth

- Base spacing uses Tailwind's 4px scale.
- Inputs use `rounded-md`.
- Cards and panels use `rounded-xl`.
- Hero panels use layered borders and soft shadows, not heavy glow.

## 5. Primitives

- Brand mark: `public/mannamap-icon.png` inside a clipped 36px wrapper so the source image's black outer pixels do not appear in the UI.
- Primary button: green fill, 44px minimum height, visible focus ring.
- Secondary link/button: ink text with subtle underline or border.
- Input/select: bordered neutral field, 44px minimum height, clear error text.
- Planning panel: single-purpose form surface with muted background and restrained elevation.

## 6. Accessibility

- Page language is Korean.
- Every form control has a visible label.
- Error text is tied to the invalid field through `aria-describedby`.
- Interactive controls keep at least 44px touch target height.
- Make it mandatory to apply elements such as cursor: pointer to clickable elements like buttons.
- Write the markup logic with 100% web accessibility in mind.
