'use client';

import { useTranslations } from 'next-intl';
import { useState, FormEvent } from 'react';
import { Phone, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function CommandesPage() {
  const t = useTranslations();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          formSource: 'Commandes',
          eventDate: formData.eventDate,
          eventType: formData.eventType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      // Success
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
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer.'
      );
    } finally {
      setIsSubmitting(false);
    }
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
                  <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl shadow-lg flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-white" strokeWidth={3} />
                    </div>
                    <div>
                      <p className="text-green-900 font-semibold text-base">{t('orders.form.success')}</p>
                      <p className="text-green-700 text-sm mt-1">Nous vous contacterons bientôt pour discuter de votre commande</p>
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-medium" style={{ color: '#B8232B' }}>
                      {errorMessage}
                    </p>
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
                      placeholder="Décrivez votre événement en détail..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-ruban-red hover:bg-ruban-red-dark text-white font-sans font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? 'Envoi en cours...' : t('orders.form.submit')}
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
