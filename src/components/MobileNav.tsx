import Link from 'next/link';
import { Home, Image, Mail, Settings } from 'lucide-react';

export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 w-full glass h-16 flex items-center justify-around px-4 z-50">
      <Link href="/" className="flex flex-col items-center text-secondary hover:text-primary transition-colors">
        <Home size={24} />
        <span className="text-[10px] mt-1">Home</span>
      </Link>
      <Link href="/gallery" className="flex flex-col items-center text-secondary hover:text-primary transition-colors">
        <Image size={24} />
        <span className="text-[10px] mt-1">Galleria</span>
      </Link>
      <Link href="/contact" className="flex flex-col items-center text-secondary hover:text-primary transition-colors">
        <Mail size={24} />
        <span className="text-[10px] mt-1">Contatti</span>
      </Link>
    </div>
  );
}
