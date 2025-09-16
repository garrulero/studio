
'use client';

import { Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {

  return (
    <footer className="w-full bg-secondary border-t">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center gap-4">
        <img src="/logos/solo logo sin fondo.svg" alt="GoiLab Logo" className="h-10 w-auto" />
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} GoiLab. Todos los derechos reservados.
          </p>
          <Link href="https://www.linkedin.com/company/goilab/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
