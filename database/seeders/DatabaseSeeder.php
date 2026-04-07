<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Faq;
use App\Models\PricingPlan;
use App\Models\ProcessStep;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin User
        User::factory()->create([
            'name' => 'Admin KeyPro',
            'email' => 'admin@keypro-service.fr',
            'password' => bcrypt('password'),
        ]);

        // Real Services
        $serviceData = [
            [
                'name' => 'Mécanicien Électronique',
                'short' => 'Diagnostic et réparation des systèmes électroniques embarqués.',
                'desc' => 'Expertise avancée en électronique automobile. Nous intervenons sur les calculateurs (ECU), les réseaux multiplexés et tous les composants électroniques critiques de votre véhicule.',
            ],
            [
                'name' => 'Programmation Automobile',
                'short' => 'Programmation (mémoire véhicules) : codage, adaptation et mise à jour.',
                'desc' => 'Service de programmation profonde des mémoires flash et EEPROM. Nous réalisons l\'adaptation de modules, la mise à jour des firmwares constructeurs et la personnalisation des options véhicule.',
            ],
            [
                'name' => 'Vente & Solutions Clés',
                'short' => 'Vente de clés, scanners, machines de programmation et programmation clés.',
                'desc' => 'Large gamme de clés vierges, scanners de diagnostic multimarques et machines de programmation de pointe. Nous proposons également un service complet de programmation pour accompagner vos achats d\'équipements.',
            ],
            [
                'name' => 'Formations Techniques',
                'short' => 'Sessions de formation sur le diagnostic et la programmation auto.',
                'desc' => 'Transfert de compétences pour les professionnels : diagnostic électronique, usage des outils de programmation et techniques de réparation des systèmes embarqués modernes.',
            ],
            [
                'name' => 'Interventions Hybrides',
                'short' => 'Assistance technique flexible : à distance ou directement en atelier.',
                'desc' => 'Profitez de notre expertise où que vous soyez grâce à nos solutions d\'intervention à distance ou venez nous rencontrer dans notre atelier spécialisé pour une prise en charge complète.',
            ],
        ];

        $services = [];
        foreach ($serviceData as $index => $data) {
            $services[] = Service::create([
                'name' => $data['name'],
                'slug' => Str::slug($data['name']),
                'short_description' => $data['short'],
                'description' => $data['desc'],
                'is_active' => true,
                'is_featured' => true,
                'sort_order' => $index,
                'turnaround_time' => '1-2 heures',
            ]);
        }

        // Real Brands (Categories)
        $brandData = [
            ['name' => 'Japonaises', 'headline' => 'Toyota, Honda, Nissan, Mazda, Mitsubishi...'],
            ['name' => 'Européennes', 'headline' => 'Mercedes, BMW, Audi, Peugeot, Renault, VW...'],
            ['name' => 'Américaines', 'headline' => 'Ford, Chevrolet, Jeep, Cadillac, Dodge...'],
            ['name' => 'Chinoises', 'headline' => 'Haval, Chery, BYD, Geely, Changan...'],
        ];

        foreach ($brandData as $data) {
            $brand = Brand::create([
                'name' => $data['name'],
                'slug' => Str::slug($data['name']),
                'headline' => $data['headline'],
                'description' => "Support technique complet pour les véhicules de fabrication {$data['name']}.",
                'is_active' => true,
                'is_featured' => true,
            ]);

            // Attach all services to these main categories
            $brand->services()->attach(collect($services)->pluck('id')->all());
        }

        // Process Steps
        $steps = [
            ['title' => 'Identification', 'desc' => 'Analyse de votre besoin via téléphone ou formulaire.'],
            ['title' => 'Diagnostic', 'desc' => 'Vérification technique en atelier ou sur place.'],
            ['title' => 'Opération', 'desc' => 'Reproduction, codage ou réparation de votre système.'],
            ['title' => 'Validation', 'desc' => 'Tests de sécurité finaux et remise des clés.'],
        ];

        foreach ($steps as $idx => $step) {
            ProcessStep::create([
                'title' => $step['title'],
                'description' => $step['desc'],
                'sort_order' => $idx,
            ]);
        }

        // Pricing Plans
        PricingPlan::create([
            'name' => 'Reproduction Basic',
            'price' => 'À partir de 25.000 F',
            'description' => 'Pour les clés classiques sans centralisation.',
            'features' => ['Taille de lame haute précision', 'Test de démarrage', 'Garantie 6 mois'],
            'sort_order' => 0,
        ]);

        PricingPlan::create([
            'name' => 'Smart Key Pack',
            'price' => 'À partir de 65.000 F',
            'description' => 'Programmation de clé intelligente avec centralisation.',
            'features' => ['Puce de sécurité certifiée', 'Programmation antidémarrage', 'Test centralisation', 'Garantie 12 mois'],
            'is_featured' => true,
            'sort_order' => 1,
        ]);

        PricingPlan::create([
            'name' => 'Full Diagnostic',
            'price' => '15.000 F',
            'description' => 'Analyse complète de l\'électronique moteur et habitacle.',
            'features' => ['Lecture codes défauts', 'Effacement des erreurs', 'Rapport technique digital', 'Conseil expert'],
            'sort_order' => 2,
        ]);

        // FAQs
        $faqs = [
            ['q' => 'Proposez-vous une assistance le dimanche ?', 'a' => 'Oui, nous assurons une permanence pour les urgences critiques (véhicule bloqué, perte totale de clés) le dimanche à Abidjan.'],
            ['q' => 'Quelles marques de voitures couvrez-vous ?', 'a' => 'Nous couvrons la majorité des marques Japonaises, Européennes, Américaines et Chinoises circulant en Côte d\'Ivoire.'],
            ['q' => 'Combien de temps prend une programmation de clé ?', 'a' => 'En moyenne, une intervention dure entre 30 minutes et 1 heure selon la complexité du système de sécurité du véhicule.'],
            ['q' => 'Faut-il présenter la carte grise ?', 'a' => 'Oui, pour toute reproduction ou programmation de clé, une preuve de propriété (Carte Grise) et une pièce d\'identité sont obligatoires.'],
        ];

        foreach ($faqs as $idx => $faq) {
            Faq::create([
                'question' => $faq['q'],
                'answer' => $faq['a'],
                'is_published' => true,
                'sort_order' => $idx,
            ]);
        }

        // Testimonials
        Testimonial::create([
            'customer_name' => 'Koffi Kouamé',
            'role' => 'Particulier',
            'company' => 'Toyota RAV4',
            'quote' => 'Perte totale de mes clés un samedi soir. Technicien mobile arrivé en 40 min, clé refaite sur place. Service impeccable !',
            'rating' => 5,
            'is_published' => true,
        ]);

        Testimonial::create([
            'customer_name' => 'Marie-Laure',
            'role' => 'Chef d\'entreprise',
            'company' => 'Logistique Express',
            'quote' => 'Nous confions toute la maintenance de nos boitiers de flotte à KeyPro. Rapidité et professionnalisme constants.',
            'rating' => 5,
            'is_published' => true,
        ]);
    }
}
