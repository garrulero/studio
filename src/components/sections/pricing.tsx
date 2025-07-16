import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    name: 'Optimización Esencial',
    price: '840€',
    description: 'Para resolver un problema específico y obtener resultados rápidos.',
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
    name: 'Solución a Medida',
    price: '3.600€',
    description: 'Para proyectos complejos que requieren integraciones o soluciones a medida.',
    features: [
      'Análisis integral y estratégico',
      'Desarrollo de soluciones personalizadas',
      'Integración con sistemas existentes (ERP, CRM)',
      'Formación continua y soporte dedicado',
      'Soluciones avanzadas y automatizaciones',
    ],
    isPopular: false,
  },
];

const supportTiers = [
    {
        name: "Básico",
        price: "90€",
        description: "Proyectos de optimización esencial.",
    },
    {
        name: "Pro",
        price: "120€",
        description: "Proyectos de transformación digital.",
    },
    {
        name: "Avanzado",
        price: "180€",
        description: "Proyectos con integraciones complejas.",
    }
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
            <Card key={plan.name} className={`flex flex-col h-full bg-card transition-all ${plan.isPopular ? 'border-primary shadow-lg' : 'shadow-sm hover:shadow-md'}`}>
              {plan.isPopular && <Badge className="absolute -top-3 right-4">Recomendado</Badge>}
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
            <Card className="max-w-2xl mx-auto bg-card/70 border-dashed">
                <CardContent className="p-6">
                    <p className="font-semibold text-foreground">Una inversión centrada en resultados tangibles.</p>
                    <p className="text-muted-foreground text-sm">Nuestro objetivo es que recuperes tiempo valioso y optimices tus recursos. El valor real está en la claridad y eficiencia que ganas.</p>
                </CardContent>
            </Card>
        </div>
        
        <div className="mt-20 text-center">
            <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                    Soporte y Mantenimiento Mensual
                </h3>
                <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
                    Para garantizar que tu solución funciona siempre a pleno rendimiento, cada proyecto incluye un plan de soporte mensual obligatorio. Este plan se asigna automáticamente según la complejidad del proyecto, no es seleccionable.
                </p>
                <div className="grid sm:grid-cols-3 gap-6 mt-10">
                    {supportTiers.map(tier => (
                         <Card key={tier.name} className="bg-card shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl">{tier.name}</CardTitle>
                                <CardDescription>{tier.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{tier.price}<span className="text-sm font-normal text-muted-foreground">/mes</span></p>
                            </CardContent>
                         </Card>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground mt-6">
                    La cancelación del soporte implica la pérdida de acceso al sistema tras 30 días (se entregará una copia de seguridad completa de tus datos si la solicitas).
                </p>
            </div>
        </div>

      </div>
    </section>
  );
}
