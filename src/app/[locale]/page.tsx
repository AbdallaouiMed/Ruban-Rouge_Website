import { useTranslations } from 'next-intl';
import { Button } from '@/components/Button';

export default function Home() {
  const t = useTranslations();

  return (
    <div>
      {/* Hero Section - Dark background for transparent navbar */}
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
          <p className="font-script text-2xl md:text-3xl text-gold mb-6 animate-fade-in">
            {t('heritage.since')}
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in">
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

      {/* Content Below Hero */}
      <section className="py-24 bg-ivory">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold text-espresso mb-4">
            Phase 2 Complete
          </h2>
          <p className="font-sans text-lg text-espresso/70 max-w-2xl mx-auto">
            Navbar with transparent-to-solid scroll behavior, language switcher, and full footer
            are now integrated. Scroll up to see the navbar change!
          </p>
        </div>
      </section>
    </div>
  );
}
