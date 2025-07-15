import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const painPoints = [
  "Dedico horas a buscar un email o un archivo que no aparece.",
  "Mi equipo y yo nos pisamos las tareas constantemente.",
  "Siento que pago por herramientas que nadie en la empresa utiliza."
];

export function HeroSection() {
  return (
    <section className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              ¿Sientes que pierdes tiempo en tareas absurdas?
            </h1>
            <h2 className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              GoiLab ayuda a pequeñas empresas a poner orden en su forma de trabajar. Sin complicaciones, sin paja, sin tonterías.
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild>
                <a href="#tarifas">Empezar a optimizar</a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href="#casos-de-exito">Ver casos de éxito</a>
              </Button>
            </div>
          </div>
          <div className="space-y-6">
            {painPoints.map((point, index) => (
              <Card key={index} className="bg-secondary border-l-4 border-primary shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <Quote className="w-8 h-8 text-primary shrink-0 transform -scale-x-100 fill-current" />
                  <p className="font-medium text-foreground/90 italic">"{point}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
