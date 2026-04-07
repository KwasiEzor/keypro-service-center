# KEYPRO SERVICE CENTER — Improvement Plan

> Generated: April 7, 2026
> Based on: Professional Audit (see AUDIT.md)

---

## Phase 1: Fix Critical Blockers (Immediate)

- [ ] Fix build error (`@/actions` import in `app-sidebar.tsx`)
- [ ] Change `APP_NAME` to "KeyPro Service Center"
- [ ] Delete `welcome.tsx` (dead code — home route uses `public/home`)
- [ ] Add rate limiting: `throttle:5,1` on `leads.store` route
- [ ] Add honeypot field to lead form (anti-spam)
- [ ] Enable `MustVerifyEmail` on User model
- [ ] Fix contact info inconsistency (use +225 country code in placeholders)

## Phase 2: Security & Authorization

- [ ] Create `LeadPolicy` (view own leads, admin can view all)
- [ ] Create `AppointmentPolicy`
- [ ] Apply policies in `DashboardController`
- [ ] Add CSP headers via middleware
- [ ] Enable session encryption in `.env.example`
- [ ] Add throttle middleware to all public form routes
- [ ] Add `user_id` nullable FK on leads table for authenticated submissions

## Phase 3: SEO & Accessibility

- [ ] Add `<meta name="description">` per page via `<Head>`
- [ ] Add Open Graph + Twitter Card meta tags
- [ ] Set proper `<title>` per page (e.g., "Services | KeyPro Service Center")
- [ ] Add JSON-LD structured data (LocalBusiness schema) to layout
- [ ] Add `aria-*` attributes to interactive elements
- [ ] Add skip-to-content link in public layout
- [ ] Create real legal pages (Mentions Légales, Confidentialité, CGV)
- [ ] Generate `sitemap.xml`
- [ ] Update `robots.txt` to reference sitemap

## Phase 4: Performance Optimization

- [ ] Self-host fonts (Space Grotesk + Instrument Sans)
- [ ] Replace Unsplash URLs with Spatie Media Library
- [ ] Add `loading="lazy"` to below-fold images
- [ ] Implement query caching for public pages (`Cache::remember()`)
- [ ] Code-split framer-motion (dynamic import)
- [ ] Add `Inertia::defer()` for non-critical page data
- [ ] Configure proper image conversions via Spatie Media Library

## Phase 5: Missing Core Features

- [ ] Build appointment scheduling flow
- [ ] Implement lead status workflow (New → Contacted → In Progress → Completed)
- [ ] Build AI chatbot with Laravel AI SDK
- [ ] Set up Laravel Reverb for real-time
- [ ] Create Settings admin page
- [ ] Implement activity logging
- [ ] Build PWA (manifest.json, service worker)

## Phase 6: Premium UX Polish

- [ ] Fix placeholder text to match automotive context everywhere
- [ ] Build interactive service detail pages
- [ ] Add WhatsApp integration (click-to-chat)
- [ ] Build client portal progress timeline
- [ ] Add Google Maps embed in contact
- [ ] Build before/after project gallery
- [ ] Add animated counter statistics

## Phase 7: DevOps & Deployment

- [ ] Create `deploy.sh` script
- [ ] Set up Nginx + PHP-FPM config templates
- [ ] Configure Supervisor for queues + Reverb
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Install Laravel Horizon
- [ ] Create production `.env.production` template
- [ ] Add health check endpoint
- [ ] Set up automated database backups
