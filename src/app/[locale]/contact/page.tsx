'use client';

import { useTranslations } from 'next-intl';
import { useState, FormEvent } from 'react';
import { MapPin, Phone, Clock, Mail, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
          formSource: 'Contact',
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

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-espresso via-espresso/95 to-ruban-red-dark"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70" />
        <div className="relative z-10 container mx-auto px-4 py-16 text-center text-white">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            {t('contact.title')}
          </h1>
          <p className="font-script text-xl md:text-2xl text-gold">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Address */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ruban-red/10 mb-4">
                <MapPin className="w-8 h-8 text-ruban-red" />
              </div>
              <h3 className="font-display text-xl font-bold text-espresso mb-2">Adresse</h3>
              <p className="text-espresso/80 text-sm">
                {t('visit.address')}
                <br />
                Meknès, Maroc
              </p>
            </div>

            {/* Phone */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ruban-red/10 mb-4">
                <Phone className="w-8 h-8 text-ruban-red" />
              </div>
              <h3 className="font-display text-xl font-bold text-espresso mb-2">Téléphone</h3>
              <a
                href="tel:+212535510010"
                className="block text-ruban-red hover:text-ruban-red-dark transition-colors text-sm mb-1"
              >
                +212 5 35 51 00 10
              </a>
              <a
                href="tel:+212663206008"
                className="block text-ruban-red hover:text-ruban-red-dark transition-colors text-sm"
              >
                +212 6 63 20 60 08
              </a>
            </div>

            {/* Hours */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ruban-red/10 mb-4">
                <Clock className="w-8 h-8 text-ruban-red" />
              </div>
              <h3 className="font-display text-xl font-bold text-espresso mb-2">
                {t('visit.hours_title')}
              </h3>
              <p className="text-espresso/80 text-sm">{t('visit.hours')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso mb-6">
                {t('contact.form.message')}
              </h2>
              <p className="text-espresso/80 mb-8">
                Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais.
              </p>

              <div className="bg-white rounded-lg shadow-xl p-8">
                {isSubmitted && (
                  <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl shadow-lg flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-white" strokeWidth={3} />
                    </div>
                    <div>
                      <p className="text-green-900 font-semibold text-base">{t('contact.form.success')}</p>
                      <p className="text-green-700 text-sm mt-1">Nous vous répondrons dans les plus brefs délais</p>
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
                      {t('contact.form.name')}
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

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-espresso mb-2"
                      >
                        {t('contact.form.email')}
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
                        {t('contact.form.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-espresso/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ruban-red focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-espresso mb-2"
                    >
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-espresso/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ruban-red focus:border-transparent resize-none"
                      placeholder="Votre message..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-ruban-red hover:bg-ruban-red-dark text-white font-sans font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? 'Envoi en cours...' : t('contact.form.submit')}
                  </button>
                </form>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso mb-6">
                {t('visit.title')}
              </h2>
              <p className="text-espresso/80 mb-8">
                Retrouvez-nous au cœur de Meknès, à quelques minutes du centre-ville.
              </p>

              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
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

              {/* Directions Button */}
              <a
                href="https://www.google.com/maps/dir//33.8992,-5.5271"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-espresso font-sans font-semibold px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg"
              >
                <MapPin className="w-5 h-5" />
                Obtenir l'itinéraire
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
