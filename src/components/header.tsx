
'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/casos', label: 'Casos' },
  { href: '/faq', label: 'FAQ' },
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl text-foreground">
          GoiLab
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
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
                   <Link href="/" className="font-bold text-lg text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                    GoiLab
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Cerrar menú</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-4 p-4 text-base">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="transition-colors hover:text-foreground text-muted-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
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
