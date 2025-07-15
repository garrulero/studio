import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="w-full py-24 lg:py-40">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight">
          Deja de perder el tiempo en tareas absurdas.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          GoiLab ayuda a pymes a optimizar sus procesos y herramientas. Menos caos, más foco. Sin complicaciones, sin paja, sin tonterías.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg">
            <a href="#tarifas">Empezar a optimizar</a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="#casos-de-exito">Ver casos de éxito</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
