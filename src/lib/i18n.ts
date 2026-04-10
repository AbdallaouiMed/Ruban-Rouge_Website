// Re-export locale constants from the main i18n config
export const locales = ['fr', 'ar', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';
