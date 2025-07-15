import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    name: 'Optimización Esencial',
    price: '840€',
    description: 'Ideal para resolver un problema específico y obtener resultados rápidos.',
    features: [
      'Análisis de un proceso clave',
      'Implementación de una herramienta focalizada',
      'Formación inicial para el equipo',
      'Soporte por email',
    ],
    isPopular: false,
  },
  {
    name: 'Transformación Digital',
    price: '1.700€',
    description: 'Para digitalizar y conectar varios procesos manuales de tu operativa.',
    features: [
      'Análisis de múltiples flujos de trabajo',
      'Suite de herramientas conectadas',
      'Workshop avanzado para el equipo',
      'Soporte prioritario',
      'Dashboard de seguimiento',
    ],
    isPopular: true,
  },
  {
    name: 'Solución a Medida con IA',
    price: '3.600€',
    description: 'Para proyectos complejos que requieren integraciones o soluciones con IA.',
    features: [
      'Análisis integral y estratégico',
      'Desarrollo de soluciones personalizadas',
      'Integración con sistemas existentes (ERP, CRM)',
      'Formación continua y soporte dedicado',
      'Implementación de soluciones con IA',
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
            Una inversión inteligente en la eficiencia de tu negocio. Elige el punto de partida que mejor se adapte a ti.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col h-full bg-card border border-border/80 transition-all ${plan.isPopular ? 'border-primary ring-2 ring-primary' : 'hover:border-primary/50'}`}>
              {plan.isPopular && <Badge className="absolute -top-3 right-4 bg-primary text-primary-foreground">Recomendado</Badge>}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-sm text-muted-foreground">Desde</span>
                  <span className="text-4xl font-extrabold ml-2">{plan.price}</span>
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
                  Solicitar presupuesto
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
