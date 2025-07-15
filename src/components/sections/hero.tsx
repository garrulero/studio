import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full py-24 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0 animated-gradient animate-gradient-move opacity-40 blur-3xl"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_100%)]"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 animate-glow [text-shadow:0_0_20px_white]">
          Deja de perder el tiempo en tareas absurdas.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-glow [text-shadow:0_0_15px_white]">
          GoiLab ayuda a pymes a optimizar sus procesos y herramientas. Menos caos, más foco. Sin complicaciones, sin paja, sin tonterías.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-br from-primary via-purple-500 to-fuchsia-500 text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-primary/40 transition-shadow duration-300">
            <a href="#tarifas">
              Empezar a optimizar
              <ArrowRight className="inline-block ml-2 w-5 h-5"/>
            </a>
          </Button>
          <Button size="lg" variant="secondary" asChild className="text-lg font-semibold bg-secondary/80 hover:bg-secondary">
            <a href="#casos-de-exito">
              <PlayCircle className="mr-2 w-5 h-5"/>
              Ver casos de éxito
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
