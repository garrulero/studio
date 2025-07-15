import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Workflow, Rocket, LifeBuoy } from 'lucide-react';

const services = [
  {
    icon: Workflow,
    title: 'Optimización de Procesos',
    description: 'Analizamos tus flujos de trabajo para eliminar cuellos de botella y hacer que tu equipo sea más ágil y productivo.',
  },
  {
    icon: Rocket,
    title: 'Implementación Inteligente',
    description: 'Seleccionamos e integramos las herramientas digitales perfectas para ti. Ni más, ni menos. Solo las que generan impacto.',
  },
  {
    icon: LifeBuoy,
    title: 'Formación y Soporte Continuo',
    description: 'Empoderamos a tu equipo para que domine las nuevas herramientas y te acompañamos para asegurar el éxito a largo plazo.',
  },
];

export function ServicesSection() {
  return (
    <section id="servicios" className="w-full py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Soluciones para llevar tu negocio al siguiente nivel</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Nos enfocamos en tres áreas clave para transformar tu manera de trabajar.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-card border border-border/80 hover:border-primary/50 transition-all duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-md">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
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
