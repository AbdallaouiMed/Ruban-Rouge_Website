import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-ivory">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="font-display text-6xl font-bold text-espresso mb-4">
            Ruban Rouge
          </h1>
          <p className="font-script text-3xl text-gold mb-8">
            {t('heritage.since')}
          </p>
          <h2 className="font-display text-4xl font-bold text-ruban-red mb-6">
            {t('hero.title')}
          </h2>
          <p className="font-sans text-xl text-espresso/80 mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-ruban-red hover:bg-ruban-red-dark text-white font-sans font-semibold px-8 py-3 rounded-full transition-colors">
              {t('hero.cta_primary')}
            </button>
            <button className="border-2 border-gold text-gold hover:bg-gold hover:text-white font-sans font-semibold px-8 py-3 rounded-full transition-colors">
              {t('hero.cta_secondary')}
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="font-sans text-espresso/60">
            Phase 1 Complete — Foundation is ready! 🎉
          </p>
        </div>
      </main>
    </div>
  );
}
