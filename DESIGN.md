---
name: Homely El Salvador
colors:
  surface: '#fff8f4'
  surface-dim: '#e8d7c9'
  surface-bright: '#fff8f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1e7'
  surface-container: '#fdebdc'
  surface-container-high: '#f7e5d7'
  surface-container-highest: '#f1dfd1'
  on-surface: '#231a11'
  on-surface-variant: '#554339'
  inverse-surface: '#392f25'
  inverse-on-surface: '#ffeee0'
  outline: '#897268'
  outline-variant: '#dcc1b5'
  surface-tint: '#9b4509'
  primary: '#9b4509'
  on-primary: '#ffffff'
  primary-container: '#e07a3e'
  on-primary-container: '#501f00'
  inverse-primary: '#ffb690'
  secondary: '#645d55'
  on-secondary: '#ffffff'
  secondary-container: '#ebe1d6'
  on-secondary-container: '#6a635b'
  tertiary: '#745a34'
  on-tertiary: '#ffffff'
  tertiary-container: '#af9066'
  on-tertiary-container: '#3e2a08'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#ffb690'
  on-primary-fixed: '#331100'
  on-primary-fixed-variant: '#783200'
  secondary-fixed: '#ebe1d6'
  secondary-fixed-dim: '#cec5bb'
  on-secondary-fixed: '#1f1b14'
  on-secondary-fixed-variant: '#4c463e'
  tertiary-fixed: '#ffddb2'
  tertiary-fixed-dim: '#e4c193'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#5a421f'
  background: '#fff8f4'
  on-background: '#231a11'
  surface-variant: '#f1dfd1'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: auto
  max-width-content: 1200px
---

## Brand & Style
The design system is built on a foundation of "Radical Approachability." It targets a diverse Salvadoran demographic, ranging from homeowners to independent service providers. The visual language rejects corporate coldness in favor of a warm, humanist aesthetic that reflects local craftsmanship and community trust.

The style is **Modern-Organic**, blending the cleanliness of contemporary SaaS with the tactile warmth of earth-toned palettes. It utilizes soft geometry, meaningful whitespace, and a high-contrast focal point to ensure the UI feels helpful rather than transactional. The goal is to evoke the feeling of a recommendation from a trusted neighbor.

## Colors
This design system uses a palette inspired by natural elements and Salvadoran ceramics.

- **Primary (Terracotta):** Used for primary actions, brand moments, and active states. It provides energy and warmth.
- **Secondary (Sand/Earth):** Used for large surface areas and background containers to reduce eye strain and differentiate from "white-label" corporate apps.
- **Accent (Sage/Petrol):** Sage Green (#4F7942) is specifically reserved for "Verified" statuses and successful completion of tasks. Petrol Blue (#2E5A6E) is used for instructional information or professional trust markers.
- **Neutrals:** We avoid pure black (#000000). Our "Charcoal" is a deep brown-tinted grey (#4A3F35) to maintain the warmth of the typography.

## Typography
We use **Plus Jakarta Sans** for its friendly, open counters and modern humanist touch. It provides excellent legibility in Spanish, handling accents and character density gracefully.

- **Headlines:** Use tighter letter-spacing and heavier weights to create a sense of stability.
- **Body Text:** Use `body-md` for general descriptions. Ensure a minimum contrast ratio of 4.5:1 against sand backgrounds.
- **Labels:** Used for category tags (e.g., "Plomería", "Electricidad") and button text. Always semi-bold or higher to ensure prominence.

## Layout & Spacing
The layout follows a **Fluid-to-Fixed** hybrid model. 

- **Mobile:** A single-column flow with 20px side margins. Elements like service cards should utilize 100% of the available width minus margins.
- **Desktop:** A 12-column grid centered in a 1200px container.
- **Rhythm:** We use an 8px base grid. All paddings and margins should be multiples of 8 (8, 16, 24, 32, 40). Large sections should be separated by `lg` (40px) or `xl` (64px) to maintain an airy, non-cluttered "home" feeling.

## Elevation & Depth
Depth in this design system is created through **Soft Tonal Layering** rather than harsh shadows.

- **Level 0 (Base):** The `secondary_color` (#F2E8DD) acts as the canvas.
- **Level 1 (Cards/Surface):** Pure White (#FFFFFF) surfaces used for cards. These feature a very soft, diffused shadow: `0px 4px 20px rgba(74, 63, 53, 0.08)`.
- **Level 2 (Interactive):** Hover states for cards increase the shadow spread and lift the element slightly (y-offset -2px) to signify "pick-up" readiness.
- **Overlays:** Modals and bottom sheets use a 40% opacity tint of the neutral dark color for the backdrop blur.

## Shapes
The shape language is consistently rounded to eliminate "sharp" or aggressive corners.

- **Components:** Standard buttons and input fields use `rounded-md` (0.5rem).
- **Cards & Containers:** Large containers like service provider profiles use `rounded-lg` (1rem).
- **Status Badges:** Verification chips and price tags use `rounded-xl` (1.5rem) or pill-shapes to distinguish them from functional buttons.

## Components

### Buttons
- **Primary:** Solid Terracotta (#E07A3E) with White text. Bold weight. Minimal 48px height for mobile tap targets.
- **Secondary:** Transparent background with a 1.5px border of Terracotta.
- **Tertiary:** Sand background with Dark Neutral text for low-priority actions.

### Cards
- Service cards must feature a 1:1 aspect ratio image with the top corners rounded to match the container.
- Use a "Trust Bar" at the bottom of the card featuring the Sage Green verification badge and a star rating.

### Input Fields
- Inputs use a white background with a thin `tertiary_color` (#C9A87C) border.
- On focus, the border thickens and changes to the Primary Terracotta.

### Feedback & Badges
- **Verified Badge:** A Sage Green circle with a white checkmark, always accompanied by the text "Verificado".
- **Alerts:** Use the Warning Amber (#D99330) for "Expiring soon" or "Low balance" notifications, ensuring it stays distinct from the Primary Orange.

### Iconography
- Use rounded, thick-stroke icons (2px weight). Icons should depict domestic tools (hammers, brushes, keys) with softened edges to match the typography.