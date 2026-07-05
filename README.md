# Cozy Paws Cattery Maine Coon

A premium, fully responsive Maine Coon cattery website built with **React + Vite**, **React Router**, and **Framer Motion**. Original branding, copy, and SVG illustrations — no copyrighted content from any reference site.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero, featured kittens, about, process, what's included, facilities, live cams, testimonials, FAQ, contact CTA |
| `/about` | About Us — story, values, kings & queens |
| `/kittens` | Available Kittens with status filtering |
| `/kittens/:id` | Kitten detail with facts, price, and reserve CTA |
| `/purchase-process` | 6-step purchase process + delivery options |
| `/whats-included` | Health, paperwork, go-home kit, lifetime support |
| `/facilities` | Facilities tour |
| `/kitten-cams` | Live kitten cams |
| `/gallery` | Filterable gallery |
| `/testimonials` | Family testimonials with animated counters |
| `/faq` | Animated FAQ accordion |
| `/contact` | Contact info + inquiry form |

## Structure

```
src/
  components/   # Navbar, Footer, KittenCard, Accordion, Reveal, Counter, CatArt, ...
  data/         # kittens, testimonials, faqs
  pages/        # one component per route
  index.css     # design system (CSS custom properties)
```

## Notes

- Cat photography lives in `public/images/cats/` and is rendered via `CatArt.jsx` (pass `img="file.jpg"`). The bundled photos are freely licensed images sourced from Wikimedia Commons; some are Creative Commons licenses that require attribution — before commercial use, verify each file's license on commons.wikimedia.org or replace them with your own cattery photography.
- The contact form is front-end only; wire `onSubmit` in `src/pages/Contact.jsx` to your backend or a service like Formspree.
- Deploy the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages). Configure SPA fallback to `index.html` for client-side routing.
