# David Akerele — Portfolio

Personal portfolio website for **David Akerele**, Software Engineer & Frontend Architect based in Manchester, UK. MSc Computer Science student specialising in frontend architecture, full-stack development, and AI-powered web experiences.

**Live:** [akereledavid.vercel.app](https://akereledavid.vercel.app)  
**GitHub:** [github.com/DavidAkerele](https://github.com/DavidAkerele)  
**LinkedIn:** [linkedin.com/in/david-akerele-38837623a](https://www.linkedin.com/in/david-akerele-38837623a/)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`, TypeScript) |
| Build tool | Vite 6 + `@vitejs/plugin-vue` |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animation | GSAP 3 with ScrollTrigger & MotionPathPlugin |
| Scroll | Lenis smooth scroll (RAF loop) |
| Fonts | Cabinet Grotesk Variable (`font-title`) · Bricolage Grotesque (`font-fancy`) |
| Utilities | VueUse · moment-timezone · vue3-lottie |
| SEO | vite-plugin-sitemap · vite-plugin-robots · JSON-LD structured data |

---

## Sections

- **Loading Screen** — animated SVG curve wipe with the Akerele name reveal
- **Hero** — full-viewport sticky section with GSAP per-character name entrance (`DAVID AKERELE`)
- **About Me** — bio, location, and MSc CS context; scroll-driven section leave animation
- **Services** — 6 sticky-scroll cards: Frontend Engineering · Full-Stack Development · AI-Powered Solutions · Mobile Development · Hardware Engineering · Networking
- **Selected Works** — 5 client projects as landscape cards (B&W on desktop, full colour on hover); each card has a **View Live** external link and a **Case Study** overlay with project description, challenge, and solution
- **Testimonials** — 4 client testimonials with animated quote transitions (Slider component)
- **Contact** — CTA section linking to `akereledavidd@gmail.com`
- **Footer** — live local time clock (Europe/London), social links, navigation

---

## Featured Projects

| Project | Category | URL |
|---|---|---|
| Whole Purple | Full-Stack & E-Commerce | [wholepurple.vercel.app](https://wholepurple.vercel.app/) |
| Sporting Lagos FC | Frontend & Sports | [sportinglagos.com](https://sportinglagos.com) |
| OnePortal Estates | Frontend & Real Estate | [oneportalestates.com](https://oneportalestates.com) |
| Treasure Trove Sewing | E-Commerce & Retail | [treasuretrovesewingmachines.com](https://www.treasuretrovesewingmachines.com/) |
| Dynasty Africa | Frontend & Creative Agency | [dynastyafrica.com](https://www.dynastyafrica.com/) |

---

## Running Locally

```bash
git clone https://github.com/DavidAkerele/portfolio26.git
cd portfolio26
npm install
npm run dev
```

Runs on `http://localhost:5173/portfolio/` by default.

```bash
# Type-check + production build
npm run build

# Preview the production build
npm run preview
```

---

## Project Structure

```
src/
├── animations/       # GSAP timeline helpers (entrance, scroll, navbar)
├── assets/
│   ├── fonts/        # Cabinet Grotesk Variable + Switzer Variable
│   ├── images/       # Project screenshots + testimonial avatars
│   └── videos/       # Contact section video asset
├── components/
│   ├── common/       # Button, Nav, Link
│   ├── design/       # LoadingScreen, Cursor, Slider, Footer, ProjectOverlay
│   └── sections/     # Hero, aboutMe, Services, Works, Contact, People
├── data.ts           # Social links, nav links, location, hero text
├── functions/        # textSplitterIntoChar, getAvailableForWorkDate
├── main.ts           # App entry — Lenis RAF loop exported for global use
└── style.css         # Tailwind v4 theme, custom heading utilities, global fonts
```

---

## Key Implementation Notes

**Per-character text animation** — `textSplitterIntoChar()` wraps each character in `<span class="letters translate-y-[120%]">`. GSAP then animates `y → 0` with stagger on scroll trigger.

**Hero name** — `MyEnName.vue` renders `DAVID AKERELE` as inline `<span>` elements with class `letter-char`, sized at `clamp(2rem, 11vw, 10rem)`. The GSAP entrance selector targets `.letter-char`.

**Sticky services** — 6 cards use calculated `top` and `margin-bottom` values (`8vh` base, `4em` step per card) so each card stacks cleanly and the last card's full content remains visible in the viewport.

**Works hover effect** — screenshots use `md:grayscale md:brightness-75` by default, transitioning to `md:group-hover:grayscale-0 md:group-hover:brightness-100` on hover. Mobile shows full colour.

**Project overlay** — `ProjectOverlay.vue` is teleported to `<body>` and uses a CSS `translateY` transition. Contains the full case study: screenshot, tech stack, description, challenge, and solution.

**Lenis + GSAP** — the Lenis instance is exported from `main.ts` and imported wherever scroll locking is needed (nav open/close, project overlay).

---

## Contact

**Email:** akereledavidd@gmail.com  
**X:** [@DdAkelz](https://x.com/DdAkelz)
