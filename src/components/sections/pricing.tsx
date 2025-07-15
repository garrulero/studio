import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    name: 'Esencial',
    price: '490€',
    description: 'Perfecto para resolver un problema concreto y ver resultados rápidos.',
    features: [
      'Análisis de 1 proceso clave',
      'Implementación de 1 herramienta',
      '2h de formación para el equipo',
      'Soporte por email durante 1 mes',
    ],
    isPopular: false,
  },
  {
    name: 'Profesional',
    price: '990€',
    description: 'La solución integral para transformar la operativa de tu negocio.',
    features: [
      'Análisis de hasta 3 procesos',
      'Implementación de suite de herramientas',
      'Workshop de 4h para el equipo',
      'Soporte prioritario durante 3 meses',
      'Dashboard de seguimiento de KPIs',
    ],
    isPopular: true,
  },
  {
    name: 'A medida',
    price: 'Personalizado',
    description: 'Una solución única para desafíos complejos y equipos grandes.',
    features: [
      'Análisis integral de la empresa',
      'Desarrollo de soluciones a medida',
      'Formación continua y personalizada',
      'Acuerdo de Nivel de Servicio (SLA)',
      'Integraciones con tus sistemas actuales',
    ],
    isPopular: false,
  },
];

export function PricingSection() {
  return (
    <section id="tarifas" className="w-full py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Planes diseñados para tu crecimiento</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Una inversión inteligente en la eficiencia de tu negocio. Elige el plan que te impulse hacia adelante.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col h-full bg-card border border-border/80 transition-all ${plan.isPopular ? 'border-primary ring-2 ring-primary' : 'hover:border-primary/50'}`}>
              {plan.isPopular && <Badge className="absolute -top-3 right-4 bg-primary text-primary-foreground">Más popular</Badge>}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.name !== 'A medida' && <span className="text-muted-foreground"> / pago único</span>}
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full text-lg font-semibold" size="lg" variant={plan.isPopular ? 'default' : 'secondary'}>
                  {plan.name === 'A medida' ? 'Solicitar presupuesto' : 'Empezar ahora'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto bg-card border border-border/80">
                <CardContent className="p-6">
                    <p className="font-semibold">¿El retorno de la inversión? Lo notarás desde el primer mes.</p>
                    <p className="text-muted-foreground text-sm">Nuestros clientes ahorran una media de 10 horas semanales por empleado. <br/> ¡Imagina lo que podrías hacer con ese tiempo!</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
