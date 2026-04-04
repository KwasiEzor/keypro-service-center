export type PublicService = {
    id: number;
    name: string;
    slug: string;
    short_description: string | null;
    description: string | null;
    turnaround_time: string | null;
    is_featured: boolean;
    brands: Array<{
        name: string;
        slug: string;
    }>;
};

export type PublicBrand = {
    id: number;
    name: string;
    slug: string;
    headline: string | null;
    description: string | null;
    is_featured: boolean;
    services: Array<{
        name: string;
        slug: string;
    }>;
};

export type PublicFaq = {
    id: number;
    question: string;
    answer: string;
};

export type PublicTestimonial = {
    id: number;
    customer_name: string;
    company: string | null;
    role: string | null;
    quote: string;
    rating: number | null;
};

export type PublicProject = {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    category: string | null;
    client_name: string | null;
    completion_date: string | null;
    image: string | null;
};

export type PublicProcessStep = {
    id: number;
    title: string;
    description: string | null;
    icon: string | null;
};

export type PublicPricingPlan = {
    id: number;
    name: string;
    price: string | null;
    description: string | null;
    features: string[];
    is_featured: boolean;
};

export type LeadOptions = {
    services: Array<{
        id: number;
        name: string;
    }>;
    brands: Array<{
        id: number;
        name: string;
    }>;
};
