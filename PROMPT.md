Tu es un collectif d’agents IA coordonnés par un Tech Lead senior.

Ta mission : construire un produit SaaS-like complet, production-ready pour :

KEYPRO SERVICE CENTER

==================================================
0. STACK GLOBALE
==================================================

Backend :
- Laravel 13+
- PHP 8.3+
- PostgreSQL
- Eloquent ORM

Frontend :
- React + TypeScript
- Inertia.js
- Vite
- Tailwind CSS

Admin :
- FilamentPHP 5.x

Temps réel :
- Laravel Reverb

IA :
- Laravel AI SDK
- Laravel Boost

Planification :
- Zap

Infrastructure :
- VPS Hostinger (Ubuntu 24.04)
- Nginx
- PHP-FPM
- Redis
- Supervisor/systemd
- Cron

==================================================
1. PACKAGES À INSTALLER
==================================================

Installer dès le départ :

composer require filament/filament
composer require spatie/laravel-permission
composer require spatie/laravel-medialibrary
composer require filament/spatie-laravel-media-library-plugin:"^5.0" -W
composer require spatie/laravel-settings
composer require filament/spatie-laravel-settings-plugin:"^5.0" -W
composer require laravel/reverb
composer require laravel/horizon
composer require laravel/ai
composer require laravel/boost
composer require laraveljutsu/zap
composer require laravel/pennant

Dev :
composer require pestphp/pest --dev
composer require nunomaduro/larastan --dev

==================================================
2. ARCHITECTURE
==================================================

Laravel = source of truth métier

/app
  /AI
    /Agents
    /Tools
  /Actions
  /Services
  /Models
  /Policies
  /Events
  /Listeners
  /Jobs
  /Filament
    /Resources
    /Widgets

Frontend :
/resources/js
  /pages
  /components
  /features
  /layouts
  /chatbot

==================================================
3. MODULES À DÉVELOPPER
==================================================

PUBLIC :
- homepage
- services
- brands
- contact
- quote form
- chatbot AI
- FAQ
- PWA ready

ADMIN (Filament) :
- leads
- appointments
- services
- brands
- faq
- testimonials
- media
- settings
- activity logs

==================================================
4. BASE DE DONNÉES
==================================================

Tables :
- users
- leads
- appointments
- services
- brands
- faqs
- testimonials
- media
- site_settings
- chatbot_conversations
- chatbot_messages
- activity_logs

==================================================
5. CHATBOT IA
==================================================

Utiliser Laravel AI SDK pour créer :

Agent principal :
- ServiceInquiryAgent

Tools obligatoires :
- SearchServicesTool
- SearchFaqsTool
- CheckBrandSupportTool
- CollectLeadTool
- CreateLeadDraftTool
- SuggestAppointmentSlotsTool
- CreateAppointmentDraftTool
- HandoffToHumanTool

L’agent doit utiliser des outputs structurés et ne jamais écrire directement sans validation backend.

Le SDK permet de créer agents + tools + structured output + streaming + embeddings + RAG. :contentReference[oaicite:0]{index=0}

==================================================
6. TEMPS RÉEL (REVERB)
==================================================

Installer et configurer Reverb :

php artisan install:broadcasting

Créer events :
- LeadCreated
- AppointmentCreated
- ChatbotHandoffRequested

Reverb est un serveur WebSocket Laravel natif pour communication temps réel. :contentReference[oaicite:1]{index=1}

==================================================
7. PLANIFICATION (ZAP)
==================================================

Implémenter :
- disponibilités
- créneaux
- blocages
- réservation

Le chatbot doit appeler Zap pour vérifier les créneaux.

==================================================
8. FILAMENT ADMIN
==================================================

Créer resources :

- LeadResource
- AppointmentResource
- ServiceResource
- BrandResource
- FAQResource
- TestimonialResource
- MediaResource
- SettingsPage

Inclure :
- tables
- filtres
- actions
- badges statut
- widgets dashboard

==================================================
9. VPS HOSTINGER SETUP
==================================================

Installer :

- Nginx
- PHP 8.3
- PostgreSQL
- Redis (PhpRedis recommandé)
- Node.js 20+
- Supervisor

Configurer :

Nginx → Laravel public
Supervisor → queue:work, horizon, reverb:start
Cron → php artisan schedule:run

==================================================
10. PROCESS LONG-RUNNING
==================================================

Créer services :

- horizon
- queue worker
- reverb

Supervisor config example :

[program:laravel-worker]
command=php artisan queue:work
autostart=true
autorestart=true

==================================================
11. SCRIPT DÉPLOIEMENT
==================================================

Créer deploy.sh :

composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan horizon:terminate

==================================================
12. SÉCURITÉ
==================================================

- Form Requests
- Policies
- rate limiting chatbot
- validation tool IA
- logs activité
- auth admin protégée

==================================================
13. TESTS
==================================================

Créer :
- tests auth
- tests leads
- tests appointments
- tests chatbot tools
- tests policies

==================================================
14. WORKFLOW AGENTS IA
==================================================

Agent Architect :
- structure projet

Agent Backend :
- Laravel core

Agent Filament :
- admin panel

Agent Frontend :
- React/Inertia

Agent AI :
- chatbot + tools

Agent Realtime :
- Reverb

Agent DevOps :
- VPS + deploy

Agent QA :
- tests + sécurité

==================================================
15. ROADMAP
==================================================

v0.1 → setup + auth + filament
v0.2 → site public
v0.3 → leads
v0.4 → admin
v0.5 → scheduling (Zap)
v0.6 → realtime (Reverb)
v0.7 → chatbot
v1.0 → production

==================================================
16. RÈGLES STRICTES
==================================================

- pas de pseudo-code
- code exécutable uniquement
- projet toujours fonctionnel
- validation backend obligatoire
- logique métier centralisée Laravel
- IA via tools uniquement
- pas de duplication
- pas de composants géants

==================================================
17. DÉMARRAGE
==================================================

Commence immédiatement :

1. architecture
2. migrations
3. setup Laravel + Filament
4. frontend Inertia
5. admin resources
6. chatbot
7. realtime
8. VPS config

Avance sans attendre validation.