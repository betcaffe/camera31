'use client';

import { useState } from 'react';
import { getSiteData } from '@/lib/data-loader';
import { Mail, Phone, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const data = getSiteData();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="pt-8 md:pt-24 pb-20 px-6 md:px-12 min-h-screen bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="mb-4">{data.contact.title}</h1>
          <p className="subtitle max-w-2xl mx-auto">{data.contact.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1 text-secondary">Email</h3>
                <p className="text-gray-600">{data.contact.email}</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1 text-secondary">Telefono</h3>
                <p className="text-gray-600">{data.contact.phone}</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1 text-secondary">Indirizzo</h3>
                <p className="text-gray-600">{data.contact.address}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            {status === 'success' ? (
              <div className="bg-white p-12 rounded-3xl shadow-xl border border-green-100 flex flex-col items-center text-center animate-fade-in">
                <div className="bg-green-100 p-4 rounded-full text-green-600 mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4">Messaggio Inviato!</h3>
                <p className="text-gray-600 mb-8">Grazie per averci contattato. Ti risponderemo al più presto.</p>
                <Button onClick={() => setStatus('idle')}>Invia un altro messaggio</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Il tuo nome"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="la-tua@email.com"
                  />
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Messaggio</label>
                  <textarea 
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Come possiamo aiutarti?"
                  ></textarea>
                </div>
                
                {status === 'error' && (
                  <p className="text-red-500 text-sm mb-4">Si è verificato un errore. Riprova più tardi.</p>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Invio in corso...
                    </>
                  ) : (
                    'Invia Messaggio'
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20">
          <h2 className="text-center mb-12">Dove trovarci</h2>
          <div className="w-full h-[450px] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.123456789!2d9.123456789!3d45.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDA3JzEyLjQiTiA5wrAwNycxMi40IkU!5e0!3m2!1sit!2sit!4v1234567890" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <p className="text-center mt-6 text-gray-500 text-sm">
            * Nota: Questa è una mappa di esempio. Puoi aggiornare l'indirizzo nel pannello Admin.
          </p>
        </div>
      </div>
    </div>
  );
}
