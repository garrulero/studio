
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Loader2, ShieldCheck, Sparkles, AlertCircle, Lightbulb, FileText, Puzzle, ArrowRight, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { logError } from '@/lib/error-logger';

const plans = [
  {
    name: 'Optimización Esencial',
    price: 'Desde 1.200€',
    description: 'Para resolver un problema específico y obtener resultados rápidos.',
    features: [
      'Análisis de 1 proceso clave',
      'Implementación de herramienta focalizada',
      'Hasta 2 integraciones simples (Excel, email, WhatsApp)',
      'Formación inicial para el equipo (2 horas)',
      'Soporte por email (respuesta 24h)',
      '1 mes de garantía con ajustes incluidos',
    ],
    isPopular: false,
  },
  {
    name: 'Transformación Digital',
    price: 'Desde 2.500€',
    description: 'Para digitalizar y conectar varios procesos manuales de tu operativa.',
    features: [
      'Análisis de múltiples flujos de trabajo (2-4 procesos)',
      'Suite de herramientas conectadas',
      'IA básica incluida (chatbot, automatizaciones inteligentes)',
      '3-6 integraciones (APIs, sistemas externos)',
      'Workshop avanzado para el equipo (4 horas)',
      'Soporte prioritario (respuesta 4h)',
      'Dashboard de seguimiento con métricas clave',
      '1 mes de garantía + 3 meses de seguimiento',
    ],
    isPopular: true,
  },
  {
    name: 'Solución Avanzada con IA',
    price: 'Desde 5.500€',
    description: 'Para automatizar tareas complejas usando modelos de IA a medida.',
    features: [
      'Todo lo del plan Transformación Digital',
      'Desarrollo de agentes de IA personalizados',
      'Machine learning y análisis predictivo',
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
        price: "115€",
        description: "Proyectos de optimización esencial.",
    },
    {
        name: "Pro",
        price: "150€",
        description: "Proyectos de transformación digital.",
    },
    {
        name: "Avanzado",
        price: "225€",
        description: "Proyectos con integraciones complejas.",
    }
];

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce una dirección de email válida.' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
});

async function sendWebhook(data: z.infer<typeof formSchema>) {
  const webhookUrl = 'https://n8n.goilab.com/webhook/contacto-goilab';
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Error al enviar el formulario.');
  }
}

export default function ServiciosPage() {
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
        const err = error instanceof Error ? error : new Error(String(error));
        logError({
          message: err.message,
          stack: err.stack,
          trigger: `Submit en formulario de solicitud de presupuesto para el plan: '${selectedPlan}'`,
        });
      }
    });
  }

  return (
    <>
    <section className="relative w-full py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Recupera el control y enfócate en crecer.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Optimizamos los procesos y herramientas de tu pyme para que dejes atrás el caos y te dediques a lo que de verdad importa.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
           <Button size="lg" asChild>
            <Link href="#tarifas">
              Ver planes <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/casos">
              <PlayCircle className="mr-2 w-5 h-5"/>
              Ver casos
            </Link>
          </Button>
        </div>
      </div>
    </section>

    <section id="como-trabajamos" className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">¿Cómo trabajamos en GoiLab?</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
              Antes de hablar de precios o herramientas, empezamos por escucharte.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">1. Diagnóstico sin compromiso</h3>
                <p className="text-sm text-muted-foreground">Analizamos tu situación actual con una encuesta guiada. Detectamos cuellos de botella, oportunidades y prioridades.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-1">2. Presupuesto personalizado</h3>
                    <p className="text-sm text-muted-foreground">No usamos plantillas. Te preparamos una propuesta adaptada a tu realidad, tu ritmo y tus objetivos.</p>
                </div>
            </div>
            <div className="flex items-start gap-4 md:col-span-2 lg:col-span-1">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <Puzzle className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-1">3. Soluciones modulares, paso a paso</h3>
                    <p className="text-sm text-muted-foreground">No hace falta hacerlo todo de golpe. Nuestro enfoque es progresivo y adaptado al punto en el que estás.</p>
                </div>
            </div>
          </div>
        </div>
    </section>

    <section id="enfoque-progresivo" className="w-full py-16 lg:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Empezamos por lo esencial y crecemos por fases, a tu ritmo
            </h2>
            <p className="text-lg text-muted-foreground mt-6">
                No necesitas una transformación total desde el día uno. Construimos tu solución como un puzzle, pieza a pieza, obteniendo resultados desde el primer paso.
            </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
            <Card className="bg-card">
                <CardHeader>
                    <CardTitle>¿Mucho desorden?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Empezamos por lo esencial: organizar un área clave para que sientas el alivio rápidamente.</p>
                </CardContent>
            </Card>
            <Card className="bg-card">
                <CardHeader>
                    <CardTitle>¿Varios procesos manuales?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Digitalizamos lo más urgente y vamos sumando nuevas automatizaciones poco a poco.</p>
                </CardContent>
            </Card>
            <Card className="bg-card">
                <CardHeader>
                    <CardTitle>¿Quieres automatizar con IA?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Preparamos primero una base de datos sólida y luego escalamos con inteligencia artificial.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>

      <section id="tarifas" className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Planes orientativos</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
             A continuación te mostramos algunos ejemplos de punto de partida, pero recuerda: cada camino es único y ajustado a tu caso.
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
                <CardContent className="flex-grow flex flex-col">
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                  </div>
                  <ul className="space-y-4 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 border-t border-dashed">
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                       <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                       <p>
                        Tarifa orientativa. El presupuesto se ajusta tras el diagnóstico según alcance y complejidad.
                       </p>
                    </div>
                  </div>
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

      <section className="w-full py-16 lg:py-24 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">¿Listo para empezar?</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                Solicita tu diagnóstico gratuito y sin compromiso. Analizaremos tu caso y te propondremos un plan de acción claro.
            </p>
            <div className="mt-8">
                <Button size="lg" asChild>
                    <Link href="/agendar">
                        Solicita tu diagnóstico gratuito <ArrowRight className="ml-2 w-5 h-5"/>
                    </Link>
                </Button>
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
