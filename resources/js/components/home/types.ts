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

export interface DealerData {
    id: number;
    name: string;
    category: string;
    lat: number;
    lng: number;
    address: string | null;
    contact_number: string | null;
    is_open: boolean;
}

export interface HomeProps {
    projects: ProjectData[];
    dealers: DealerData[];
}
