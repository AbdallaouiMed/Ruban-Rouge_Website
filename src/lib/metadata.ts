import { Metadata } from 'next';

export function generateMetadata(params: {
  title: string;
  description: string;
  locale: string;
  path?: string;
}): Metadata {
  const { title, description, locale, path = '' } = params;

  const baseUrl = 'https://rubanrouge-meknes.ma'; // Update with actual domain
  const url = `${baseUrl}/${locale}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Ruban Rouge Meknès',
      locale: locale === 'ar' ? 'ar_MA' : locale === 'fr' ? 'fr_MA' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Ruban Rouge - Pâtisserie Artisanale à Meknès',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: url,
      languages: {
        fr: `${baseUrl}/fr${path}`,
        en: `${baseUrl}/en${path}`,
        ar: `${baseUrl}/ar${path}`,
      },
    },
  };
}
