
'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/casos', label: 'Casos' },
  { href: '/faq', label: 'FAQ' },
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const NavLink = ({ href, label, isMobile = false }: { href: string; label: string, isMobile?: boolean }) => {
    const isActive = pathname === href;
    
    if (isMobile) {
      return (
        <Link
          href={href}
          className={cn(
            "transition-colors hover:text-foreground flex items-center gap-2",
            isActive ? "text-foreground" : "text-muted-foreground",
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {isActive && <span className="h-2 w-2 rounded-full bg-primary"></span>}
          {label}
        </Link>
      );
    }
    
    return (
      <Link
        href={href}
        className={cn(
          "transition-colors hover:text-foreground relative flex flex-col items-center gap-1 py-2",
          isActive ? "text-foreground" : "text-muted-foreground",
        )}
      >
        <span>{label}</span>
        <span
          className={cn(
            "h-1 w-1 rounded-full bg-primary transition-opacity",
            isActive ? "opacity-100" : "opacity-0"
          )}
        ></span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <img src="/logos/solo logo cuadrado.svg" alt="GoiLab Logo" className="h-8 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <NavLink key={item.label} href={item.href} label={item.label} />
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button asChild>
            <Link href="/agendar">
              Agendar Cita
            </Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] bg-background">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                   <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                      <img src="/logos/solo logo cuadrado.svg" alt="GoiLab Logo" className="h-7 w-auto" />
                   </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Cerrar menú</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-4 p-4 text-base">
                  {navItems.map((item) => (
                    <NavLink key={item.label} href={item.href} label={item.label} isMobile={true} />
                  ))}
                </nav>
                <div className="mt-auto p-4 border-t">
                  <Button asChild className="w-full">
                    <Link href="/agendar" onClick={() => setIsMobileMenuOpen(false)}>Agendar Cita</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
