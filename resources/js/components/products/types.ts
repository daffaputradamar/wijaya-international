export interface ProductColor {
    name: string;
    hex: string;
}

export interface ProductKeySpec {
    value: string;
    label: string | null;
}

export interface ProductSpecRow {
    type: 'header' | 'row';
    label: string;
    value: string | null;
}

export interface PublicBrand {
    id: number;
    name: string;
    logo_url: string;
}

export interface PublicProduct {
    id: number;
    brand_id: number;
    name: string;
    category: string | null;
    key_specs: ProductKeySpec[];
    specifications: ProductSpecRow[];
    colors: ProductColor[];
    is_highlight: boolean;
    images: string[];
}

/** Pick a readable text color for a chip with the given background hex. */
export function contrastText(hex: string): string {
    const clean = hex.replace('#', '');
    const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    if ([r, g, b].some(Number.isNaN)) return '#1a1a1a';
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? '#1a1a1a' : '#ffffff';
}
