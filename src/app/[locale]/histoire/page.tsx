import { useTranslations } from 'next-intl';
import { Award, Heart, Lightbulb, Users } from 'lucide-react';
import Image from 'next/image';

export default function HistoirePage() {
  const t = useTranslations();

  // Get timeline from translations
  const timeline = t.raw('histoire_page.timeline') as Array<{
    year: string;
    title: string;
    description: string;
  }>;

  const values = [
    {
      icon: Award,
      key: 'excellence',
      title: t('histoire_page.values.excellence.title'),
      description: t('histoire_page.values.excellence.description'),
    },
    {
      icon: Heart,
      key: 'tradition',
      title: t('histoire_page.values.tradition.title'),
      description: t('histoire_page.values.tradition.description'),
    },
    {
      icon: Lightbulb,
      key: 'innovation',
      title: t('histoire_page.values.innovation.title'),
      description: t('histoire_page.values.innovation.description'),
    },
    {
      icon: Users,
      key: 'famille',
      title: t('histoire_page.values.famille.title'),
      description: t('histoire_page.values.famille.description'),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-espresso via-espresso/95 to-ruban-red-dark"
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
          <p className="font-script text-2xl md:text-3xl text-gold mb-4">
            {t('heritage.since')}
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            {t('histoire_page.title')}
          </h1>
          <p className="font-sans text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            {t('histoire_page.subtitle')}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-sans text-lg md:text-xl leading-relaxed text-espresso/90">
              {t('histoire_page.intro')}
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-4">
              {t('histoire_page.timeline_title')}
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          {/* Timeline */}
          <div className="max-w-5xl mx-auto relative">
            {/* Vertical Line (hidden on mobile) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gold/30 transform -translate-x-1/2"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-5/12">
                    <div
                      className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow ${
                        index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
                      <div className="font-display text-3xl font-bold text-ruban-red mb-2">
                        {item.year}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-espresso mb-3">
                        {item.title}
                      </h3>
                      <p className="text-espresso/80 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Year Badge (Center) */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-lg z-10">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-ruban-red"></div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-ruban-red to-ruban-red-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold mb-4">
              {t('histoire_page.values_title')}
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.key}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-lg hover:bg-white/20 transition-colors text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-4">
                    <Icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-sm leading-relaxed opacity-90">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Heritage Image Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80"
                alt="Ruban Rouge Heritage"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-espresso mb-6">
                {t('heritage.years')}
              </h3>
              <p className="font-script text-xl text-gold mb-6">{t('heritage.since')}</p>
              <p className="text-lg leading-relaxed text-espresso/80 mb-6">
                {t('story.description')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-ruban-red/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-ruban-red" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-espresso">
                      Maîtres Artisans
                    </p>
                    <p className="text-sm text-espresso/70">
                      Formés aux techniques françaises traditionnelles
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-ruban-red/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-ruban-red" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-espresso">
                      Recettes Authentiques
                    </p>
                    <p className="text-sm text-espresso/70">
                      Transmises de génération en génération
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
