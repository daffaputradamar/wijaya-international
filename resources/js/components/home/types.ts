export interface BrandData {
    id: number;
    name: string;
    logo_url: string;
}

export interface ProjectData {
    id: number;
    name: string;
    image_url: string;
}

export interface ProductCategoryData {
    id: number;
    key: string;
    title_id: string;
    title_en: string;
    body_id: string;
    body_en: string;
    image_url: string | null;
    video_url: string | null;
}

export interface ServiceCardData {
    id: number;
    key: string;
    icon_key: string;
    title_id: string;
    title_en: string;
    body_id: string;
    body_en: string;
}

export interface LatestNewsData {
    id: number;
    title_id: string;
    title_en: string;
    slug: string;
    image_url: string;
    published_at: string | null;
    category: { name_id: string; name_en: string; slug: string } | null;
}

export interface HomeProps {
    brands: BrandData[];
    projects: ProjectData[];
    productCategories: ProductCategoryData[];
    serviceCards: ServiceCardData[];
    latestNews: LatestNewsData[];
}
