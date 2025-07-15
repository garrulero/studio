'use client';

import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#casos-de-exito', label: 'Casos de Éxito' },
  { href: '#tarifas', label: 'Tarifas' },
  { href: '#sobre-nosotros', label: 'Sobre Nosotros' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <a href="#" className="font-bold text-xl text-foreground">
          GoiLab
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
           <Button variant="outline" asChild>
            <a href="#contacto">
              <Heart className="w-4 h-4 mr-2"/>
              Contactar
            </a>
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
                   <a href="#" className="font-bold text-lg text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                    GoiLab
                  </a>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Cerrar menú</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-4 p-4 text-lg">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="transition-colors hover:text-foreground text-muted-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-auto p-4 border-t">
                  <Button asChild className="w-full">
                    <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)}>Contactar</a>
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
