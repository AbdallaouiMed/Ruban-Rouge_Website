import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rubanrouge-meknes.ma';
  const locales = ['fr', 'en', 'ar'];
  const pages = ['', '/histoire', '/creations', '/commandes', '/contact'];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate entries for each page in each locale
  locales.forEach((locale) => {
    pages.forEach((page) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: {
            fr: `${baseUrl}/fr${page}`,
            en: `${baseUrl}/en${page}`,
            ar: `${baseUrl}/ar${page}`,
          },
        },
      });
    });
  });

  return sitemap;
}
