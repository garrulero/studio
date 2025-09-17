
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import demosData from '@/data/demos.json';
import { ArrowRight, Bot, FlaskConical, Truck } from 'lucide-react';
import Link from 'next/link';

// Mapeo de iconos para que sea más dinámico
const iconMap: { [key: string]: React.ElementType } = {
  Bot,
  Truck,
  FlaskConical,
};

export default function DemosPage() {
  return (
    <section className="w-full py-16 lg:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl text-center mx-auto mb-12">
          <FlaskConical className="mx-auto h-12 w-12 text-primary mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Prueba el potencial de GoiLab
          </h1>
          <p className="text-lg text-muted-foreground mt-6">
            Aquí encontrarás aplicaciones de demostración para que puedas experimentar de primera mano cómo la automatización y la inteligencia artificial pueden transformar tu negocio.
          </p>
        </div>

        <div id="galeria-demos" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {demosData.map((demo) => {
            const Icon = iconMap[demo.icono] || FlaskConical;
            return (
              <Card key={demo.titulo} className="bg-card shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col border border-border/50">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{demo.titulo}</h3>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col flex-grow">
                  <div className="space-y-4 flex-grow">
                    <p className="text-muted-foreground text-sm">{demo.descripcion}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 my-6">
                    {demo.etiquetas.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs font-normal bg-background text-muted-foreground">{tag}</Badge>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <Button asChild className="w-full" disabled={demo.url === '#'}>
                      <Link href={demo.url} target="_blank" rel="noopener noreferrer">
                        {demo.url === '#' ? 'Próximamente' : 'Acceder a la Demo'}
                        {demo.url !== '#' && <ArrowRight className="ml-2 w-4 h-4" />}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
