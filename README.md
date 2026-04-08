# Ruban Rouge Website

Premium multilingual marketing website for Ruban Rouge, a historic bakery and pâtisserie in Meknès, Morocco (est. 1940).

## 🎨 Design & Brand

**Brand Identity:**
- **Colors:** Ruban Red (#B8232B), Gold (#C9A961), Espresso (#3A2418), Cream (#F6EFE2)
- **Typography:** Playfair Display (headings), Inter (body), Allura (script accents)
- **Design Feel:** High-end Parisian pâtisserie with Moroccan warmth

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **Internationalization:** next-intl (FR/EN/AR with RTL support)
- **Icons:** lucide-react
- **Fonts:** Google Fonts (next/font optimization)
- **Image Optimization:** next/image
- **Deployment:** Vercel-ready

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/              # Internationalized routes
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   ├── histoire/          # Our Story page
│   │   ├── creations/         # Products gallery
│   │   ├── commandes/         # Custom orders form
│   │   └── contact/           # Contact page
│   ├── sitemap.ts             # Dynamic sitemap
│   ├── robots.ts              # SEO robots config
│   └── globals.css            # Global styles + Tailwind
├── components/
│   ├── Navbar.tsx             # Responsive navigation
│   ├── Footer.tsx             # Site footer
│   ├── Button.tsx             # Reusable button component
│   ├── CategoryCard.tsx       # Product category cards
│   ├── Container.tsx          # Layout wrapper
│   ├── LanguageSwitcher.tsx   # FR/EN/AR selector
│   └── StructuredData.tsx     # Schema.org JSON-LD
├── lib/
│   ├── i18n.ts                # Internationalization config
│   └── metadata.ts            # SEO metadata helper
└── messages/
    ├── fr.json                # French translations
    ├── en.json                # English translations
    └── ar.json                # Arabic translations (RTL)
```

## 🌐 Pages

### Home Page (`/`)
- Full-screen hero with pastry imagery
- Heritage strip: "1940 — 2026 · 85 ans d'excellence"
- Featured categories grid (6 cards)
- Notre Histoire teaser section
- Instagram feed placeholder (6 tiles)
- Customer testimonials (4 reviews)
- Visit Us CTA with Google Maps

### Our Story (`/histoire`)
- Hero section
- Introduction paragraph
- Interactive timeline (6 key milestones from 1940-2026)
- Core values grid (Excellence, Tradition, Innovation, Family)
- Heritage image showcase

### Products (`/creations`)
- Hero section
- Category filter buttons (All, Boulangerie, Viennoiseries, etc.)
- Product grid with hover effects
- Sample products (9 items)
- CTA to custom orders

### Custom Orders (`/commandes`)
- Hero section
- Two-column layout (sticky sidebar + form)
- Order form: name, email, phone, event date/type, message
- Event type selector (Wedding, Birthday, Baptism, Corporate, Other)
- Phone contact card with hours
- Success notification

### Contact (`/contact`)
- Hero section
- Contact info cards (Address, Phone, Hours)
- Contact form with validation
- Google Maps embed with directions link
- Success notification

## 🌍 Internationalization

**Supported Languages:**
- French (FR) - Default
- English (EN)
- Arabic (AR) - Full RTL support

**Features:**
- Automatic locale detection
- Language switcher in navbar
- RTL layout for Arabic
- Locale-prefixed URLs (`/fr`, `/en`, `/ar`)
- Translated content for all pages

## 🎯 SEO Optimization

- **Metadata:** Dynamic per-page titles and descriptions
- **Open Graph:** Social media preview cards
- **Twitter Cards:** Optimized tweet previews
- **Canonical URLs:** Proper canonical tags
- **Alternate Languages:** hreflang tags for all locales
- **Sitemap:** Auto-generated XML sitemap
- **Robots.txt:** Search engine crawling rules
- **Schema.org:** Structured data for local business

## 🚦 Getting Started

### Prerequisites
- Node.js >=20.9.0 (use nvm: `nvm use 24`)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Customization

### Brand Colors
Update colors in `src/app/globals.css`:
```css
:root {
  --ruban-red: #B8232B;
  --gold: #C9A961;
  --espresso: #3A2418;
  /* ... */
}
```

### Translations
Edit JSON files in `src/messages/`:
- `fr.json` - French
- `en.json` - English
- `ar.json` - Arabic

### Images
Update image URLs in components or add to `/public` folder.

### Business Info
Update contact details in:
- `src/messages/*.json` - Phone, address, hours
- `src/components/StructuredData.tsx` - Schema.org data
- `src/lib/metadata.ts` - Base URL for production

## 📱 Responsive Design

- **Mobile-first:** Optimized for all screen sizes
- **Breakpoints:** Tailwind default breakpoints (sm, md, lg, xl, 2xl)
- **Touch-friendly:** Large tap targets, hamburger menu on mobile
- **RTL Support:** Full right-to-left layout for Arabic

## 🔧 Configuration

### Environment Variables
Create `.env.local` for environment-specific config:
```
NEXT_PUBLIC_SITE_URL=https://rubanrouge-meknes.ma
```

### Deployment
Ready for Vercel deployment:
```bash
vercel
```

## 📦 Dependencies

**Core:**
- next: ^16.2.2
- react: ^19.0.0
- typescript: ^5.7.3

**Styling:**
- tailwindcss: ^4.0.14
- @tailwindcss/postcss: ^4.0.14

**Internationalization:**
- next-intl: ^4.2.5

**Icons & UI:**
- lucide-react: ^0.468.0

## 🏗️ Build Process

The project uses:
- **Turbopack:** Fast development bundler (Next.js 16)
- **TypeScript:** Type-safe code
- **Tailwind CSS:** Utility-first styling with v4 features
- **Image Optimization:** Automatic image optimization via next/image

## 🐛 Known Issues

- Instagram feed uses placeholder tiles (integrate Instagram API later)
- Forms submit client-side only (add backend API integration)
- Some Unsplash placeholder images may 404 (replace with real product photos)

## 📝 License

© 2026 Ruban Rouge Meknès - All rights reserved

## 🤝 Contributing

This is a private commercial website. For questions or support, contact the development team.

---

Built with ❤️ by Claude Code
Generated with [Claude Code](https://claude.com/claude-code)
