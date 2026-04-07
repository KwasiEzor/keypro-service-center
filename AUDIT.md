# 🔬 KEYPRO SERVICE CENTER — Professional Audit

> **Auditor:** Senior Full-Stack Architect & Product Designer
> **Date:** April 7, 2026
> **Stack:** Laravel 13 + Inertia v3 + React 19 + Filament 4 + Tailwind v4
> **Status:** Early-stage MVP (v0.2–v0.3 of roadmap)

---

## Executive Summary

The project has a **solid foundation** — modern stack choices, clean Eloquent architecture, typed TypeScript interfaces, and a cohesive visual language. However, it sits at roughly **25-30% completion** versus the spec in `PROMPT.md`, with several critical gaps in security, SEO, accessibility, performance, and missing modules. Below is an honest, prioritized breakdown.

---

## ✅ PROS — What's Done Well

### Architecture & Code Quality
- **Modern Stack** — Laravel 13, Inertia v3, React 19, Tailwind v4, Filament 4 — bleeding-edge and well-integrated
- **Typed Frontend** — Clean TS types in `resources/js/types/public.ts` with proper separation (`auth.ts`, `navigation.ts`, `ui.ts`)
- **Wayfinder Usage** — Routes are type-safe via `@/routes` instead of hardcoded URLs — excellent DX
- **PHPDoc Array Shapes** — Controller methods have proper `@return` array shape annotations
- **Clean Queries** — `PublicPageController` uses scoped Eloquent queries with `->when()`, eager loading, and selective column picking — no N+1 risk here
- **Form Request Validation** — `StoreLeadRequest` exists with proper rules including `exists:` checks and `Rule::in()`
- **React Compiler** — `babel-plugin-react-compiler` enabled in Vite — forward-thinking performance move
- **Design System** — CSS custom properties with oklch() colors, `--font-display` (Space Grotesk) + `--font-sans` (Instrument Sans) — professional typography pairing
- **Factories & Seeder** — All models have factories; `DatabaseSeeder` seeds realistic, domain-specific data

### Frontend & Design
- **Strong Visual Identity** — Dark hero sections, geometric overlays, brutalist/industrial aesthetic with sharp edges (`rounded-none`), uppercase tracking — cohesive brand language
- **Framer Motion** — Smooth scroll-triggered animations (`fadeInUp`, viewport once)
- **Responsive Navigation** — Sheet-based mobile menu with active state detection
- **Inertia `<Form>` Component** — Lead capture form uses the declarative `<Form>` with `resetOnSuccess` — clean pattern

### Backend
- **Filament Admin** — 10 Filament resources covering all major models (Leads, Appointments, Services, Brands, FAQs, Testimonials, etc.)
- **Filament Widgets** — `StatsOverview` and `LeadTrendChart` for admin dashboard
- **Admin Panel Gate** — `canAccessPanel()` restricts Filament to `@keypro-service.fr` emails
- **2FA Ready** — Fortify + `TwoFactorAuthenticatable` trait on User model

### Testing
- **Pest Testing** — Well-structured tests with `RefreshDatabase`, datasets, and Inertia assertions
- **Lead Submission Tests** — Covers happy path and validation error path
- **Public Pages Tests** — Parameterized tests covering all public routes with prop assertions

---

## ❌ CRITICAL ISSUES — Must Fix Before Production

### 1. 🔴 Build Is Broken
```
build_error.log: Could not load ../../../resources/js/actions
```
The `app-sidebar.tsx` imports from `@/actions` which fails during production build. This is a **showstopper** — the site cannot be deployed.

**Files:** [build_error.log](file:///Users/macbook/keypro-service-center/build_error.log), [app-sidebar.tsx](file:///Users/macbook/keypro-service-center/resources/js/components/app-sidebar.tsx)

### 2. 🔴 Welcome Page Is Still Laravel Default
[welcome.tsx](file:///Users/macbook/keypro-service-center/resources/js/pages/welcome.tsx) is the stock Laravel 13 welcome page with the "Laravel" SVG logo and "Read the Documentation" links. This file is dead code since the home route points to `public/home`, but it's still in the codebase and confusing.

### 3. 🔴 No Policies — Zero Authorization
There are **zero** Policy classes in the entire project. The `DashboardController` fetches leads by email match but has no authorization layer:
```php
$leads = Lead::where('email', $user->email)
```
Any user with a matching email can see leads. There's no `LeadPolicy`, no `AppointmentPolicy`, no gate definitions. This is a **security vulnerability**.

### 4. 🔴 No Rate Limiting on Lead Submission
The `POST /quote` endpoint (`leads.store`) has **zero rate limiting**. A bot could spam thousands of fake leads in seconds. The route doesn't even use `throttle` middleware.

### 5. 🔴 SQLite in Production Configuration
`.env` uses `DB_CONNECTION=sqlite` and the spec requires PostgreSQL. SQLite will cause concurrency issues under load and doesn't support several features the app needs (e.g., proper `LIKE`-insensitive search, array columns).

### 6. 🔴 APP_NAME Still "Laravel"
```env
APP_NAME=Laravel
```
This propagates to emails, browser tabs, and Filament panel title. Must be "KeyPro Service Center".

### 7. 🔴 No Email Verification
`MustVerifyEmail` is commented out on the User model:
```php
// use Illuminate\Contracts\Auth\MustVerifyEmail;
```
Combined with the Filament `canAccessPanel()` gate using only email domain, any unverified user with a `@keypro-service.fr` email can access admin.

---

## ⚠️ SIGNIFICANT ISSUES — Fix Before Launch

### Security

| Issue | Severity | Location |
|-------|----------|----------|
| No rate limiting on public forms | High | `routes/web.php` line 17 |
| No honeypot field on lead form | Medium | `lead-capture-form.tsx` |
| No CAPTCHA/reCAPTCHA | Medium | Lead form |
| Leads linked by email string, no user_id FK | Medium | `DashboardController` |
| `MAIL_MAILER=log` — emails go nowhere | High | `.env` line 50 |
| `APP_DEBUG=true` — exposes stack traces | Critical (prod) | `.env` line 4 |
| No CSP headers configured | Medium | All pages |
| `SESSION_ENCRYPT=false` | Medium | `.env` line 33 |

### SEO — Completely Missing

| Issue | Impact |
|-------|--------|
| No `<meta name="description">` on any page | Google shows blank description |
| No Open Graph / Twitter Card meta tags | Poor social sharing |
| No `<title>` specificity — generic titles | All pages show same title |
| No `sitemap.xml` | Search engines can't index effectively |
| No structured data (JSON-LD for LocalBusiness) | No rich snippets |
| No `<link rel="canonical">` | Potential duplicate content |
| `robots.txt` is nearly empty (just "User-agent: *") | No sitemap reference |
| Footer legal links point to `#` | Dead links hurt SEO |

### Accessibility (a11y)

| Issue | Impact |
|-------|--------|
| Zero `aria-*` attributes on public pages | Screen readers get no semantic info |
| `<select>` elements are unstyled native elements | Inconsistent UX, no keyboard hints |
| Hero images use generic `alt` text ("Maintenance Service") | Not descriptive enough |
| No skip-to-content link | Keyboard users must tab through nav |
| Color contrast: `text-slate-500` on white background | Fails WCAG AA |
| No focus-visible styles on custom components | Keyboard navigation invisible |

### Performance

| Issue | Impact |
|-------|--------|
| External images from Unsplash (5+ per page) | CORS, CDN latency, no caching control |
| No image optimization pipeline | Large uncompressed images |
| No lazy loading on below-fold images | Unnecessary initial payload |
| Font loaded from external CDN (fonts.bunny.net) | Render-blocking, external dependency |
| `framer-motion` loaded on every page | ~30KB gzipped for animations only on home |
| No caching on public page queries | Every visit hits DB for services, brands, FAQs |

---

## 🟡 MISSING FEATURES — From PROMPT.md Spec

### Not Yet Implemented

| Module | Status | Priority |
|--------|--------|----------|
| **AI Chatbot** (ServiceInquiryAgent, 8 tools) | ❌ Not started | High |
| **Real-time** (Laravel Reverb, WebSocket events) | ❌ Not started | Medium |
| **Scheduling** (Zap, availability/slots/bookings) | ❌ Not started | High |
| **Activity Logs** (model exists, no usage) | ❌ Shell only | Low |
| **Site Settings** (model exists, no admin page) | ❌ Shell only | Medium |
| **Media Library** (Spatie installed, barely used) | ❌ Minimal | Medium |
| **PWA** (manifest, service worker, offline) | ❌ Not started | Medium |
| **Redis/Horizon** (queue management) | ❌ Not configured | High (prod) |
| **Deploy Script** (`deploy.sh`) | ❌ Not started | High (prod) |
| **spatie/laravel-permission** | ❌ Not installed (listed in PROMPT) | High |
| **spatie/laravel-settings** | ❌ Not installed (listed in PROMPT) | Medium |
| **larastan** (static analysis) | ❌ Not installed | Medium |

### Partially Implemented

| Module | Status |
|--------|--------|
| **Client Dashboard** | Basic stats + empty states, no real interaction |
| **Leads Management** | Form submission works, no status workflow |
| **Appointments** | Model exists, no creation flow from frontend |
| **Contact Page** | Route exists but reuses `contact()` method for both `/contact` and `/quote` |

---

## 🎨 UX/UI ISSUES — Design Audit

### Current Visual Assessment

![Client Dashboard](file:///Users/macbook/keypro-service-center/Portail-Client-—-KeyPro-Laravel-04-06-2026_10_59_PM.png)

### Issues Found

1. **Inconsistent Brand Language**
    - Home page uses "MacBook Pro", "Galaxy S24", "borne tactile" in placeholders — but the business is an **automotive electronics** center
    - This creates cognitive dissonance for visitors

2. **Hero Image Mismatch**
    - Uses generic Unsplash industrial photos, not automotive-specific imagery
    - No actual KeyPro workshop photos, logos, or team photos

3. **Hardcoded Fallback Content**
    - `home.tsx` lines 219-223, 328-344, 359-362: If no DB data exists, hardcoded placeholders render
    - This masks data issues and creates maintenance problems

4. **No Loading/Skeleton States**
    - No skeleton loaders for data-heavy sections
    - Per Inertia v3 rules: deferred props should have pulsing skeleton states

5. **No Error/Empty States**
    - If services list is empty, the grid just shows nothing
    - No "Coming soon" or "No services available" messaging

6. **Footer Legal Links Dead**
    - "Mentions Légales", "Confidentialité", "Conditions" all link to `#`
    - For a professional service, legal pages are mandatory (especially in France/CI)

7. **Contact Info Inconsistency**
    - Footer shows "+225" country code, but form shows "+33" (France) placeholder
    - Business is in Côte d'Ivoire but placeholders suggest France

8. **Dark Mode Incomplete**
    - Some sections use hardcoded `bg-[#131313]`, others use `dark:bg-[#0a0a0a]`
    - No user toggle for dark mode on public pages

9. **Customer Dashboard Too Sparse**
    - Only shows stats cards + empty tables
    - No CTA to create a new request, no progress timeline, no real-time updates

---

## 🚀 IMPROVEMENT ROADMAP — To World-Class Level

### Phase 1: Fix Critical Blockers (1-2 days)

- [ ] Fix build error (`@/actions` import in `app-sidebar.tsx`)
- [ ] Change `APP_NAME` to "KeyPro Service Center"
- [ ] Switch `DB_CONNECTION` to PostgreSQL
- [ ] Add rate limiting: `throttle:5,1` on `leads.store`
- [ ] Delete `welcome.tsx` (dead code)
- [ ] Set `APP_DEBUG=false` for production env
- [ ] Enable `MustVerifyEmail` on User model
- [ ] Add honeypot field to lead form

### Phase 2: Security & Authorization (2-3 days)

- [ ] Create `LeadPolicy` and `AppointmentPolicy`
- [ ] Install `spatie/laravel-permission` for role-based access
- [ ] Add CSP headers via middleware
- [ ] Configure proper mail driver (Mailtrap → production SMTP)
- [ ] Enable session encryption
- [ ] Add CSRF protection verification
- [ ] Implement user_id foreign key on leads for authenticated users

### Phase 3: SEO & Accessibility (2-3 days)

- [ ] Add meta descriptions per page via `<Head>` component
- [ ] Add Open Graph + Twitter Card tags
- [ ] Generate `sitemap.xml` (use `spatie/laravel-sitemap`)
- [ ] Add JSON-LD structured data (LocalBusiness schema)
- [ ] Add `aria-*` attributes to all interactive elements
- [ ] Ensure WCAG AA contrast ratios
- [ ] Add skip-to-content link
- [ ] Create real legal pages (Mentions Légales, Privacy Policy, CGV)
- [ ] Set proper `<title>` per page (e.g., "Services | KeyPro Service Center")

### Phase 4: Performance Optimization (2-3 days)

- [ ] Self-host fonts (download Space Grotesk + Instrument Sans)
- [ ] Replace Unsplash URLs with Spatie Media Library uploads
- [ ] Add `loading="lazy"` to below-fold images
- [ ] Implement query caching for public pages (`Cache::remember()`)
- [ ] Code-split framer-motion (dynamic import only on home page)
- [ ] Configure Redis for cache, sessions, and queues
- [ ] Add `Inertia::defer()` for non-critical page data
- [ ] Implement image optimization via Spatie Media Library conversions

### Phase 5: Missing Core Features (1-2 weeks)

- [ ] Build appointment scheduling flow with Zap
- [ ] Implement lead status workflow (New → Contacted → In Progress → Completed)
- [ ] Build AI chatbot with Laravel AI SDK
- [ ] Set up Laravel Reverb for real-time notifications
- [ ] Create Settings admin page with `spatie/laravel-settings`
- [ ] Build proper activity logging system
- [ ] Implement PWA (manifest.json, service worker, offline page)

### Phase 6: Premium UX (1 week)

- [ ] Replace all Unsplash images with real workshop photography
- [ ] Fix all placeholder text to match automotive context
- [ ] Build interactive service detail pages with tabbed content
- [ ] Add WhatsApp integration (click-to-chat with pre-filled message)
- [ ] Build client portal with lead progress timeline
- [ ] Add real-time status notifications (Reverb)
- [ ] Implement Google Maps embed in contact section
- [ ] Add multi-language support (FR/EN)
- [ ] Build a before/after project gallery with lightbox
- [ ] Add animated counter statistics on scroll

### Phase 7: DevOps & Deployment (2-3 days)

- [ ] Create `deploy.sh` script per PROMPT.md spec
- [ ] Set up Nginx + PHP-FPM configuration
- [ ] Configure Supervisor for queue workers + Reverb
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Install Horizon for queue monitoring
- [ ] Configure production .env template
- [ ] Set up automated database backups
- [ ] Add health check endpoint

---

## 📊 Scoring Summary

| Category | Score | Notes |
|----------|-------|-------|
| **Architecture** | 7/10 | Clean patterns, but missing services layer + policies |
| **Backend Quality** | 6/10 | Good Eloquent usage, but no caching, no events, no authorization |
| **Frontend Quality** | 7/10 | Strong design system, typed props, but broken build |
| **Security** | 3/10 | No rate limiting, no policies, debug mode, no email verification |
| **SEO** | 1/10 | Almost entirely missing |
| **Accessibility** | 2/10 | No aria attributes, contrast issues |
| **Performance** | 4/10 | No caching, external assets, no lazy loading |
| **Testing** | 6/10 | Good start but no unit tests, no admin tests, no chatbot tests |
| **Design/UX** | 7/10 | Strong visual language but inconsistent content |
| **Feature Completeness** | 3/10 | ~25-30% of PROMPT.md spec implemented |
| **Production Readiness** | 2/10 | Cannot build, no deploy pipeline, SQLite, debug mode |

> **Overall: 4.4/10** — Strong foundation, but far from production-ready. Needs 3-4 weeks of focused work to reach v1.0.

---

## 🎯 Top 5 Priorities (Immediate Action)

1. **Fix the build** — Cannot ship if it doesn't compile
2. **Switch to PostgreSQL** + configure Redis — architectural debt
3. **Add security layer** — Policies, rate limiting, email verification
4. **SEO foundation** — Meta tags, sitemap, structured data
5. **Replace dummy content** — Real images, correct automotive placeholders, legal pages
