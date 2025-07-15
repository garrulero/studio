import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Workflow, Rocket, LifeBuoy } from 'lucide-react';

const services = [
  {
    icon: Workflow,
    title: 'Optimización de Procesos',
    description: 'Analizamos cómo trabajas y eliminamos los cuellos de botella para que todo fluya sin fricciones. Menos caos, más productividad.',
  },
  {
    icon: Rocket,
    title: 'Implementación de Herramientas',
    description: 'Seleccionamos e integramos las herramientas digitales justas y necesarias para tu equipo. Ni más, ni menos. Solo lo que funciona.',
  },
  {
    icon: LifeBuoy,
    title: 'Formación y Soporte',
    description: 'No te dejamos solo. Formamos a tu equipo para que domine las nuevas herramientas y te damos soporte para resolver cualquier duda.',
  },
];

export function ServicesSection() {
  return (
    <section id="servicios" className="w-full py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">¿Cómo te ayudamos?</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Nos centramos en tres pilares para transformar tu forma de trabajar.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center bg-secondary shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <service.icon className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
