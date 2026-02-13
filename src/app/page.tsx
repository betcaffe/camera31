import { getSiteData } from '@/lib/data-loader';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import * as Icons from 'lucide-react';

export default function Home() {
  const data = getSiteData();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative h-[90vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${data.homepage.hero.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <h1 className="text-white mb-6 animate-fade-in">{data.homepage.hero.title}</h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-100 opacity-90">{data.homepage.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gallery">
              <Button size="lg" className="w-full sm:w-auto">Esplora la Galleria</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">Prenota Ora</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-8">{data.homepage.description.title}</h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed italic">
            "{data.homepage.description.text}"
          </p>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-16 text-secondary">{data.homepage.amenities?.title || 'Comfort e Servizi'}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {data.homepage.amenities?.items.map((item: any, idx: number) => {
              const IconComponent = (Icons as any)[item.icon] || Icons.HelpCircle;
              return (
                <div key={idx} className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-transform hover:scale-105">
                  <div className="text-primary mb-4">
                    <IconComponent size={32} />
                  </div>
                  <span className="font-medium text-secondary text-sm text-center">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-16 text-secondary">{data.homepage.reviews?.title || 'Cosa dicono i nostri ospiti'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.homepage.reviews?.items.map((review: any, idx: number) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 relative">
                <div className="flex text-accent mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icons.Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <span className="font-bold text-secondary">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
