import type { IconType } from 'react-icons';
import {
    LuInstagram,
    LuFacebook,
    LuTwitter,
    LuYoutube,
    LuLinkedin,
    LuMusic,
    LuGlobe,
    LuShoppingCart,
} from 'react-icons/lu';

export interface SocialPlatform {
    key: string;
    label: string;
    type: 'social' | 'ecommerce';
    icon: IconType;
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
    { key: 'instagram', label: 'Instagram', type: 'social', icon: LuInstagram },
    { key: 'facebook', label: 'Facebook', type: 'social', icon: LuFacebook },
    { key: 'twitter', label: 'X (Twitter)', type: 'social', icon: LuTwitter },
    { key: 'youtube', label: 'YouTube', type: 'social', icon: LuYoutube },
    { key: 'linkedin', label: 'LinkedIn', type: 'social', icon: LuLinkedin },
    { key: 'tiktok', label: 'TikTok', type: 'social', icon: LuMusic },
    { key: 'whatsapp', label: 'WhatsApp', type: 'social', icon: LuGlobe },
    { key: 'tokopedia', label: 'Tokopedia', type: 'ecommerce', icon: LuShoppingCart },
    { key: 'shopee', label: 'Shopee', type: 'ecommerce', icon: LuShoppingCart },
    { key: 'lazada', label: 'Lazada', type: 'ecommerce', icon: LuShoppingCart },
    { key: 'blibli', label: 'Blibli', type: 'ecommerce', icon: LuShoppingCart },
];

export const SOCIAL_PLATFORM_KEYS = SOCIAL_PLATFORMS.map((p) => p.key);

export function getSocialPlatform(key: string): SocialPlatform | undefined {
    return SOCIAL_PLATFORMS.find((p) => p.key === key);
}

export function getSocialPlatformByLabel(label: string): SocialPlatform | undefined {
    return SOCIAL_PLATFORMS.find((p) => p.label === label);
}

export function getSocialIcon(key: string): IconType {
    return getSocialPlatform(key)?.icon ?? LuGlobe;
}
