
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative w-full pb-20 lg:pb-32 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4 flex justify-center">
          <img src="/logos/logo completo sin fondo.svg" alt="GoiLab Logo Completo" className="h-auto w-full max-w-sm text-foreground" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Recupera el control y enfócate en crecer.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Optimizamos los procesos y herramientas de tu pyme para que dejes atrás el caos y te dediques a lo que de verdad importa.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
           <Button size="lg" asChild>
            <Link href="/servicios#tarifas">
              Ver planes <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/casos">
              <PlayCircle className="mr-2 h-5 h-5"/>
              Ver casos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
