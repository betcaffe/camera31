import { getSiteData } from '@/lib/data-loader';

export default function Footer() {
  const data = getSiteData();

  return (
    <footer className="bg-secondary text-white py-6">
      <div className="w-full px-[1.5rem] md:px-[5cm]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full mb-6">
          <div className="flex flex-col items-start text-left max-w-sm">
            <h3 className="text-white text-lg mb-1">{data.settings.siteName}</h3>
            <p className="text-gray-400 text-xs md:text-sm mb-0">{data.homepage.hero.subtitle}</p>
          </div>
          
          <div className="flex flex-col items-start text-left">
            <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Link Utili</h4>
            <div className="flex flex-col gap-1">
              {data.footer.usefulLinks?.map((link: any, idx: number) => (
                <a 
                  key={idx} 
                  href={link.url} 
                  className="text-gray-400 text-xs md:text-sm hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start text-left">
            <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Contatti</h4>
            <p className="text-gray-400 text-xs md:text-sm mb-0.5">{data.contact.email}</p>
            <p className="text-gray-400 text-xs md:text-sm mb-0.5">{data.contact.phone}</p>
            <p className="text-gray-400 text-xs md:text-sm mb-0">{data.contact.address}</p>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-800 w-full text-center">
          <p className="text-[10px] md:text-xs text-gray-500 mb-0 uppercase tracking-widest">{data.footer.text}</p>
        </div>
      </div>
    </footer>
  );
}
