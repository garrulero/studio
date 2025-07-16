
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Loader2, ShieldCheck, Sparkles, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

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
    name: 'Solución Avanzada con IA',
    price: 'Desde 3.600€',
    description: 'Para automatizar tareas complejas usando modelos de IA a medida.',
    features: [
      'Todo lo del plan Transformación Digital',
      'Desarrollo de agentes de IA personalizados',
      'Integración con sistemas existentes (ERP, CRM)',
      'Automatizaciones inteligentes de alto impacto',
      'Análisis predictivo y generación de informes',
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

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce una dirección de email válida.' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
});

async function sendWebhook(data: z.infer<typeof formSchema>) {
  const webhookUrl = 'https://n8n.garrulero.xyz/webhook-test/contacto-goilab';
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Error al enviar el formulario.');
  }
}

export function PricingSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  
  const handleOpenContactModal = (planName: string) => {
    setSelectedPlan(planName);
    setIsContactModalOpen(true);
    form.reset({
        name: '',
        email: '',
        message: `Hola, estoy interesado en el plan '${planName}' y me gustaría recibir un presupuesto detallado.`
    });
  };

  const handleCloseModal = () => {
    setIsContactModalOpen(false);
    setSelectedPlan(null);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await sendWebhook(values);
        toast({
          title: "¡Solicitud enviada!",
          description: "Hemos recibido tus datos. Nos pondremos en contacto contigo para darte un presupuesto.",
        });
        form.reset();
        handleCloseModal();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo enviar tu solicitud. Por favor, inténtalo de nuevo o contacta a kaixo@goilab.com.",
        });
      }
    });
  }

  return (
    <>
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
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    {plan.name === 'Solución Avanzada con IA' && <Sparkles className="w-6 h-6 text-primary" />}
                    {plan.name}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                  </div>
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full text-lg font-semibold" 
                    size="lg" 
                    variant={plan.isPopular ? 'default' : 'secondary'}
                    onClick={() => handleOpenContactModal(plan.name)}
                  >
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

      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="sm:max-w-md bg-card">
          <DialogHeader>
            <DialogTitle>Solicitar presupuesto para "{selectedPlan}"</DialogTitle>
            <DialogDescription>
              Déjanos tus datos y nos pondremos en contacto para ofrecerte un presupuesto a medida.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="tu.email@ejemplo.com" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaje</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[100px]" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="ghost" onClick={handleCloseModal} disabled={isPending}>Cerrar</Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                        </>
                    ) : (
                        "Enviar solicitud"
                    )}
                  </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
