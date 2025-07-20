
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
import Script from 'next/script';


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
      let message = '';
      let stack: string | undefined = undefined;
      let componentStack: string | undefined = undefined;

      const errorArg = args.find(arg => arg instanceof Error);
      if (errorArg) {
          message = errorArg.message;
          stack = errorArg.stack;
      } else {
          message = args.map(arg => {
              try {
                return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
              } catch {
                return String(arg);
              }
            }).join(' ');
      }

      // Busca el componentStack, común en errores de React
      const componentStackArg = args.find(arg => typeof arg === 'string' && arg.includes('The above error occurred in the <'));
      if (componentStackArg) {
          componentStack = componentStackArg;
      }

      // Envía el error al servicio de logging
      logError({ message, stack, componentStack });
    };

    const handleGlobalError = (event: ErrorEvent) => {
      logError({ 
        message: event.message, 
        stack: event.error?.stack,
      });
    };
    
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
       logError({ 
         message: 'Unhandled promise rejection: ' + (event.reason?.message || 'No message'), 
         stack: event.reason?.stack ?? JSON.stringify(event.reason) 
       });
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
  const GA_MEASUREMENT_ID = "G-W4H8VR2PEE"; // <-- REEMPLAZA ESTO CON TU ID

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logos/solo logo sin fondo.svg" type="image/svg+xml" />
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
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
