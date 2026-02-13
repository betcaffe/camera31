import Link from 'next/link';
import { getSiteData } from '@/lib/data-loader';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
  const data = getSiteData();

  return (
    <nav className="fixed top-0 w-full z-50 glass h-16 hidden md:flex items-center justify-between px-6 md:px-12">
      <Link href="/" className="text-2xl font-bold text-primary">
        {data.settings.siteName}
      </Link>
      
      <div className="hidden md:flex space-x-8 items-center">
        {data.navigation.links.map((link) => (
          <Link 
            key={link.path} 
            href={link.path}
            className="text-secondary hover:text-primary transition-colors font-medium"
          >
            {link.label}
          </Link>
        ))}
        <Link href="/admin">
          <Button size="sm">Admin</Button>
        </Link>
      </div>
    </nav>
  );
}
