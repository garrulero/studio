
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { logError } from '@/lib/error-logger';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// No se puede exportar metadata en un client component, pero lo mantenemos por si cambia
/*
export const metadata: Metadata = {
  title: 'GoiLab - Transforma tu forma de trabajar',
  description: 'Ayudamos a pymes como la tuya a optimizar procesos y herramientas para que puedas enfocarte en crecer. Menos caos, más claridad.',
};
*/

// Componente para manejar la configuración del título y la descripción
function PageMetadata() {
  useEffect(() => {
    document.title = 'GoiLab - Transforma tu forma de trabajar';
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', 'Ayudamos a pymes como la tuya a optimizar procesos y herramientas para que puedas enfocarte en crecer. Menos caos, más claridad.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Ayudamos a pymes como la tuya a optimizar procesos y herramientas para que puedas enfocarte en crecer. Menos caos, más claridad.';
      document.head.appendChild(meta);
    }
  }, []);
  return null;
}

// Componente para manejar la captura de errores
function ErrorBoundary() {
  useEffect(() => {
    const originalConsoleError = console.error;

    console.error = (...args) => {
      // Llama al console.error original para que el comportamiento en el navegador no cambie
      originalConsoleError.apply(console, args);

      // Extrae la información relevante del error
      const message = args.map(arg => {
        if (arg instanceof Error) {
          return arg.message;
        }
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      }).join(' ');

      const stack = args.find(arg => arg instanceof Error)?.stack;

      // Envía el error al servicio de logging
      logError({ message, stack });
    };

    const handleGlobalError = (event: ErrorEvent) => {
      logError({ message: event.message, stack: event.error?.stack });
    };
    
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
       logError({ message: 'Unhandled promise rejection', stack: event.reason?.stack ?? JSON.stringify(event.reason) });
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);


    return () => {
      // Restaura el console.error original al desmontar el componente
      console.error = originalConsoleError;
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head />
      <body className={cn("font-sans antialiased bg-background text-foreground", inter.variable)}>
        <PageMetadata />
        <ErrorBoundary />
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
