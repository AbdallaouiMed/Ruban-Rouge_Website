export function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: 'Ruban Rouge',
    image: 'https://rubanrouge-meknes.ma/logo.png',
    '@id': 'https://rubanrouge-meknes.ma',
    url: 'https://rubanrouge-meknes.ma',
    telephone: '+212535510010',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '198 Bd des F.A.R., Résidence Al Hamd',
      addressLocality: 'Meknès',
      postalCode: '50000',
      addressCountry: 'MA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.8992,
      longitude: -5.5271,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '06:30',
        closes: '22:30',
      },
    ],
    sameAs: [
      'https://instagram.com/ruban_rouge_meknes',
      'https://facebook.com/PatisserieRubanRouge',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
    },
    servesCuisine: ['French Pastry', 'Moroccan Pastry', 'Bakery', 'Chocolates', 'Ice Cream'],
    foundingDate: '1940',
    description:
      'Pâtisserie artisanale française au cœur de Meknès depuis 1940. Spécialistes en boulangerie, viennoiseries, pâtisseries fines, chocolats et glaces artisanales.',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
