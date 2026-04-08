'use client';

import { useTranslations } from 'next-intl';
import { useState, FormEvent } from 'react';
import { Phone, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function CommandesPage() {
  const t = useTranslations();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to an API
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventDate: '',
      eventType: '',
      message: '',
    });
  };

  const eventTypes = [
    'wedding',
    'birthday',
    'baptism',
    'corporate',
    'other',
  ] as const;

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-espresso via-espresso/95 to-ruban-red-dark"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70" />
        <div className="relative z-10 container mx-auto px-4 py-20 text-center text-white">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            {t('orders.title')}
          </h1>
          <p className="font-script text-xl md:text-2xl text-gold">
            {t('orders.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Info & Image */}
            <div>
              <div className="sticky top-8">
                <div className="mb-8">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso mb-4">
                    {t('orders.description')}
                  </h2>
                </div>

                {/* Image */}
                <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl mb-8">
                  <Image
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"
                    alt="Custom cake"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Phone Contact */}
                <div className="bg-gradient-to-br from-ruban-red to-ruban-red-dark text-white p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Phone className="w-6 h-6 text-gold" />
                    <h3 className="font-display text-xl font-bold">
                      {t('orders.phone_note')}
                    </h3>
                  </div>
                  <a
                    href="tel:+212663206008"
                    className="text-2xl font-bold hover:text-gold transition-colors block mb-2"
                  >
                    +212 6 63 20 60 08
                  </a>
                  <p className="text-sm opacity-90">{t('visit.hours')}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <div className="bg-white rounded-lg shadow-xl p-8">
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <p className="text-green-800 text-sm">{t('orders.form.success')}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-espresso mb-2"
                    >
                      {t('orders.form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-espresso/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ruban-red focus:border-transparent"
                    />
                  </div>

                  {/* Email & Phone - 2 columns */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-espresso mb-2"
                      >
                        {t('orders.form.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-espresso/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ruban-red focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-espresso mb-2"
                      >
                        {t('orders.form.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-espresso/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ruban-red focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Event Date & Type - 2 columns */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="eventDate"
                        className="block text-sm font-semibold text-espresso mb-2"
                      >
                        {t('orders.form.event_date')}
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        required
                        value={formData.eventDate}
                        onChange={(e) =>
                          setFormData({ ...formData, eventDate: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-espresso/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ruban-red focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="eventType"
                        className="block text-sm font-semibold text-espresso mb-2"
                      >
                        {t('orders.form.event_type')}
                      </label>
                      <select
                        id="eventType"
                        required
                        value={formData.eventType}
                        onChange={(e) =>
                          setFormData({ ...formData, eventType: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-espresso/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ruban-red focus:border-transparent"
                      >
                        <option value="">Sélectionner...</option>
                        {eventTypes.map((type) => (
                          <option key={type} value={type}>
                            {t(`orders.form.event_types.${type}`)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-espresso mb-2"
                    >
                      {t('orders.form.message')}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-espresso/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ruban-red focus:border-transparent resize-none"
                      placeholder="Décrivez votre projet en détail..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-ruban-red hover:bg-ruban-red-dark text-white font-sans font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
                  >
                    {t('orders.form.submit')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
