import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    name: 'Básico',
    price: '490€',
    description: 'Para poner en orden una área específica de tu negocio.',
    features: [
      'Análisis de 1 proceso clave',
      'Implementación de 1 herramienta',
      '2h de formación para el equipo',
      'Soporte por email 1 mes',
    ],
    isPopular: false,
  },
  {
    name: 'Pro',
    price: '990€',
    description: 'La solución completa para la mayoría de pymes.',
    features: [
      'Análisis de hasta 3 procesos',
      'Implementación de suite de herramientas',
      'Workshop de 4h para el equipo',
      'Soporte prioritario 3 meses',
      'Dashboard de seguimiento',
    ],
    isPopular: true,
  },
  {
    name: 'Empresa',
    price: 'A medida',
    description: 'Para necesidades complejas y equipos grandes.',
    features: [
      'Análisis integral de la empresa',
      'Desarrollo de soluciones a medida',
      'Formación continua y personalizada',
      'Soporte dedicado y SLA',
      'Integraciones con sistemas existentes',
    ],
    isPopular: false,
  },
];

export function PricingSection() {
  return (
    <section id="tarifas" className="w-full py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Tarifas claras y sin sorpresas</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Invierte en eficiencia. Elige el plan que se adapta a ti y empieza a recuperar tu tiempo.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col h-full ${plan.isPopular ? 'border-primary ring-2 ring-primary bg-background' : 'bg-background'}`}>
              {plan.isPopular && <Badge className="absolute -top-3 right-4">Más popular</Badge>}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.name !== 'Empresa' && <span className="text-muted-foreground"> / pago único</span>}
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.isPopular ? 'default' : 'secondary'}>
                  {plan.name === 'Empresa' ? 'Contactar' : 'Empezar ahora'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto bg-background/50">
                <CardContent className="p-6">
                    <p className="font-semibold">¿ROI? Visible desde el primer mes.</p>
                    <p className="text-muted-foreground text-sm">Nuestros clientes suelen ahorrar una media de 10 horas por empleado a la semana. <br/> ¡Haz las cuentas!</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
