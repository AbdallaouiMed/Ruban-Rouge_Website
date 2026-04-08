'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';

// Note: Metadata cannot be exported from client components
// Move to layout.tsx or create a server component wrapper if needed

// Sample product data (in real app, this would come from a CMS or database)
const sampleProducts = [
  {
    id: 1,
    category: 'boulangerie',
    name: 'Pain Tradition',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
  },
  {
    id: 2,
    category: 'viennoiseries',
    name: 'Croissant au Beurre',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80',
  },
  {
    id: 3,
    category: 'patisseries',
    name: 'Mille-Feuille',
    image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80',
  },
  {
    id: 4,
    category: 'chocolats',
    name: 'Truffes Artisanales',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&q=80',
  },
  {
    id: 5,
    category: 'glaces',
    name: 'Glace Vanille',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
  },
  {
    id: 6,
    category: 'patisseries',
    name: 'Éclair au Chocolat',
    image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=600&q=80',
  },
  {
    id: 7,
    category: 'viennoiseries',
    name: 'Pain au Chocolat',
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=600&q=80',
  },
  {
    id: 8,
    category: 'boulangerie',
    name: 'Baguette',
    image: 'https://images.unsplash.com/photo-1508736793122-f516e3ba5569?w=600&q=80',
  },
];

export default function CreationsPage() {
  const t = useTranslations();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { key: 'all', label: t('creations_page.filter_all') },
    { key: 'boulangerie', label: t('categories.boulangerie') },
    { key: 'viennoiseries', label: t('categories.viennoiseries') },
    { key: 'patisseries', label: t('categories.patisseries') },
    { key: 'chocolats', label: t('categories.chocolats') },
    { key: 'glaces', label: t('categories.glaces') },
  ];

  const filteredProducts =
    activeFilter === 'all'
      ? sampleProducts
      : sampleProducts.filter((p) => p.category === activeFilter);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-espresso via-espresso/95 to-ruban-red-dark"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70" />
        <div className="relative z-10 container mx-auto px-4 py-20 text-center text-white">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            {t('creations_page.title')}
          </h1>
          <p className="font-script text-xl md:text-2xl text-gold">
            {t('creations_page.subtitle')}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-sans text-lg leading-relaxed text-espresso/90">
              {t('creations_page.intro')}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-ivory border-b border-espresso/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveFilter(category.key)}
                className={`px-6 py-2 rounded-full font-sans font-semibold transition-all ${
                  activeFilter === category.key
                    ? 'bg-ruban-red text-white shadow-lg'
                    : 'bg-white text-espresso hover:bg-cream hover:shadow-md'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-espresso/60 text-lg">{t('creations_page.no_products')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="text-xs font-sans text-gold uppercase tracking-wide mb-1">
                      {t(`categories.${product.category}`)}
                    </div>
                    <h3 className="font-display text-xl font-bold text-espresso">
                      {product.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-ruban-red to-ruban-red-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {t('orders.title')}
          </h2>
          <p className="font-sans text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {t('orders.subtitle')}
          </p>
          <a
            href={`/${t('nav.commandes')}`}
            className="inline-block bg-gold hover:bg-gold/90 text-espresso font-sans font-semibold px-8 py-3 rounded-full transition-all hover:scale-105"
          >
            {t('nav.commandes')}
          </a>
        </div>
      </section>
    </div>
  );
}
