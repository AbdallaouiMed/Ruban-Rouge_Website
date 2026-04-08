import { useTranslations } from 'next-intl';
import { Button } from '@/components/Button';
import { CategoryCard } from '@/components/CategoryCard';
import { Star, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const t = useTranslations();

  const categories = [
    {
      title: t('categories.boulangerie'),
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
      href: '/creations#boulangerie',
    },
    {
      title: t('categories.viennoiseries'),
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
      href: '/creations#viennoiseries',
    },
    {
      title: t('categories.patisseries'),
      image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80',
      href: '/creations#patisseries',
    },
    {
      title: t('categories.chocolats'),
      image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80',
      href: '/creations#chocolats',
    },
    {
      title: t('categories.glaces'),
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
      href: '/creations#glaces',
    },
    {
      title: t('categories.gateaux_commande'),
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      href: '/commandes',
    },
  ];

  // Get testimonials from translations
  const testimonials = t.raw('home.testimonials_data') as Array<{
    name: string;
    text: string;
    rating: number;
  }>;

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-espresso via-espresso/95 to-ruban-red-dark"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
        <div className="relative z-10 container mx-auto px-4 py-32 text-center text-white">
          <p className="font-script text-2xl md:text-3xl text-gold mb-6">
            {t('heritage.since')}
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="font-sans text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" href="/creations">
              {t('hero.cta_primary')}
            </Button>
            <Button variant="outline-gold" href="/contact">
              {t('hero.cta_secondary')}
            </Button>
          </div>
        </div>
      </section>

      {/* Heritage Strip */}
      <section className="bg-ruban-red text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="font-display text-2xl md:text-3xl font-bold">
            1940 — 2026 · {t('heritage.years')}
          </p>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-4">
              {t('categories.title')}
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.href}
                title={category.title}
                image={category.image}
                href={category.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Notre Histoire Teaser (2-column) */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Text Column */}
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-6">
                {t('story.title')}
              </h2>
              <p className="font-script text-2xl text-gold mb-6">{t('story.subtitle')}</p>
              <p className="text-lg leading-relaxed text-espresso/80 mb-8">
                {t('story.description')}
              </p>
              <Button variant="primary" href="/histoire">
                {t('story.cta')}
              </Button>
            </div>

            {/* Image Column */}
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80"
                alt="Notre histoire"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Placeholder */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-espresso mb-4">
              {t('instagram.title')}
            </h2>
            <p className="font-sans text-lg text-gold">{t('instagram.handle')}</p>
          </div>
          {/* Grid of 6 placeholder tiles */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <a
                key={i}
                href="https://instagram.com/ruban_rouge_meknes"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square group overflow-hidden rounded-lg"
              >
                <Image
                  src={`https://images.unsplash.com/photo-${
                    1486427944299 + i * 1000
                  }-d1955d23e34d?w=400&q=80`}
                  alt={`Instagram post ${i}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-espresso/60 italic">
              {/* Note: Wire to Instagram API later */}
              Instagram feed coming soon
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-gradient-to-br from-ruban-red to-ruban-red-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold mb-4">{t('testimonials.title')}</h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          {/* Testimonials Grid (Simple layout, can add carousel later) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-colors"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm leading-relaxed mb-4 italic">{testimonial.text}</p>

                {/* Name */}
                <p className="font-sans font-semibold text-gold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us CTA Block */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Info Column */}
              <div className="p-8 md:p-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso mb-6">
                  {t('visit.title')}
                </h2>

                {/* Address */}
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="w-6 h-6 text-ruban-red flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-sans font-semibold text-espresso mb-1">Adresse</p>
                    <p className="text-sm text-espresso/70">{t('visit.address')}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 mb-8">
                  <Clock className="w-6 h-6 text-ruban-red flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-sans font-semibold text-espresso mb-1">
                      {t('visit.hours_title')}
                    </p>
                    <p className="text-sm text-espresso/70">{t('visit.hours')}</p>
                  </div>
                </div>

                <Button variant="primary" href="/contact">
                  {t('visit.cta')}
                </Button>
              </div>

              {/* Map Preview Column */}
              <div className="relative h-64 md:h-full min-h-[300px] bg-gray-200">
                {/* Google Maps Embed Placeholder */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.9!2d-5.5271!3d33.8992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDUzJzU3LjEiTiA1wrAzMSczNy42Ilc!5e0!3m2!1sen!2sma!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ruban Rouge Location"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
