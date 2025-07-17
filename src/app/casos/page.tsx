
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import casesData from '@/data/casos.json';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, BarChart, ClipboardCheck, Clock, FileText, FolderArchive, LayoutGrid, Lightbulb, LineChart, Loader2, Phone, Send, TrendingDown, TrendingUp, X } from 'lucide-react';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const areas = [
  { name: 'Todos', icon: LayoutGrid },
  { name: 'Organización', icon: FolderArchive },
  { name: 'Atención al cliente', icon: Phone },
  { name: 'Comunicación interna', icon: Send },
  { name: 'Gestión del tiempo', icon: Clock },
  { name: 'Documentación', icon: FileText },
  { name: 'Control de tareas', icon: ClipboardCheck },
  { name: 'Seguimiento', icon: LineChart },
];


interface CaseMetric {
  nombre: string;
  antes: number;
  despues: number;
  unidad: string;
}

interface Case {
  titulo: string;
  sector: string;
  problema_coloquial: string;
  problema_descripcion: string;
  consecuencias: string;
  solucion: string;
  area: string;
  etiquetas: string[];
  antes: string;
  despues: string;
  resultado: string;
  metricas: CaseMetric[];
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce una dirección de email válida.' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
});

async function sendWebhook(data: z.infer<typeof formSchema>) {
  const webhookUrl = 'https://n8n.garrulero.xyz/webhook/contacto-goilab';
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Error al enviar el formulario.');
  }
}

export default function CasosPage() {
  const [filter, setFilter] = useState('Todos');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
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

  const filteredCases = casesData.filter(
    (story) => filter === 'Todos' || story.area === filter
  );

  const handleOpenContactModal = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsContactModalOpen(true);
    form.reset({
        name: '',
        email: '',
        message: `Hola, he visto el caso '${caseItem.titulo}' y me he sentido muy identificado. ¿Podemos hablar para ver si tenéis una solución parecida para mí?`
    });
  };
  
  const handleOpenDetailsModal = (caseItem: Case) => {
    setSelectedCase(caseItem);
  };

  const handleCloseModals = () => {
    setIsContactModalOpen(false);
    setSelectedCase(null);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await sendWebhook(values);
        toast({
          title: "¡Mensaje enviado!",
          description: "Hemos recibido tus datos. Nos pondremos en contacto contigo pronto.",
        });
        form.reset();
        handleCloseModals();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo enviar tu mensaje. Por favor, inténtalo de nuevo o contacta a kaixo@goilab.com.",
        });
      }
    });
  }

  const chartData = selectedCase?.metricas.map(m => ({
    name: m.nombre,
    'Antes de GoiLab': m.antes,
    'Después de GoiLab': m.despues,
    unit: m.unidad
  }));

  return (
    <>
      <section id="casos-de-exito" className="w-full py-16 lg:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Casos reales, soluciones aplicables</h1>
            <p className="text-lg text-muted-foreground mt-6 max-w-3xl mx-auto">
              No son grandes empresas. Son negocios que, como el tuyo, tenían un problema.
              Esto es lo que haríamos si fueras tú.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {areas.map((area) => (
              <Button
                key={area.name}
                variant={filter === area.name ? 'default' : 'outline'}
                onClick={() => setFilter(area.name)}
                className="rounded-full"
              >
                <area.icon className="w-4 h-4 mr-2" />
                {area.name}
              </Button>
            ))}
          </div>
          <div id="galeria-casos" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((story) => (
              <Card key={story.titulo} className="bg-card shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col border border-border/50">
                <CardHeader>
                   <h3 className="text-xl font-bold">{story.titulo}</h3>
                </CardHeader>
                <CardContent className="p-6 pt-0 flex flex-col flex-grow">
                  <div className="space-y-4 flex-grow">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-destructive">
                        <TrendingDown className="w-4 h-4" /> El Problema
                      </h4>
                      <p className="text-muted-foreground text-sm">{story.problema_descripcion} {story.consecuencias}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-primary">
                        <TrendingUp className="w-4 h-4" /> La Solución
                      </h4>
                      <p className="text-muted-foreground text-sm">{story.solucion}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 my-6">
                    {story.etiquetas.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs font-normal bg-background text-muted-foreground">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                    <Button onClick={() => handleOpenDetailsModal(story)} className="w-full">
                      Ver cómo lo solucionaríamos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
            <Card className="max-w-3xl mx-auto bg-card p-8 shadow-lg">
                <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4"/>
                <h2 className="text-3xl font-bold mb-4">¿Te suena alguno de estos problemas?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    La mayoría de los negocios sufren los mismos cuellos de botella. Rellena nuestro diagnóstico y te contaremos sin compromiso cómo lo resolveríamos en tu caso particular.
                </p>
                <Button size="lg" asChild>
                    <Link href="/agendar">
                        Hacer diagnóstico gratuito <ArrowRight className="ml-2 w-5 h-5"/>
                    </Link>
                </Button>
            </Card>
        </div>
      </section>
      
      {selectedCase && (
        <>
          <Dialog open={!!selectedCase && !isContactModalOpen} onOpenChange={(isOpen) => { if (!isOpen) handleCloseModals(); }}>
            <DialogContent className="sm:max-w-4xl bg-card text-foreground p-0 overflow-hidden border-0">
                <div className="absolute inset-0 animate-sky-ascent bg-[length:600px_600px] z-0"></div>
                 <div className="relative z-10 bg-card/80 backdrop-blur-sm h-full overflow-y-auto max-h-[90vh] rounded-lg">
                    <DialogClose asChild>
                      <button className="absolute top-4 right-4 z-20 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Cerrar</span>
                      </button>
                    </DialogClose>
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-2xl font-bold">{selectedCase.titulo}</DialogTitle>
                        <Badge variant="secondary" className="self-start mt-1">{selectedCase.area}</Badge>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-6 p-6">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-red-600"><TrendingDown className="w-5 h-5" /> El problema</h4>
                          <p className="text-muted-foreground">{selectedCase.antes}</p>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-green-600"><TrendingUp className="w-5 h-5 animate-glow" /> La solución</h4>
                          <p className="text-muted-foreground">{selectedCase.despues}</p>
                        </div>
                      </div>
                      <Card className="bg-background/70 border">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-lg mb-2 flex items-center gap-2"><BarChart className="w-5 h-5 text-primary" />Métricas de Impacto</h4>
                          <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsBarChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`}/>
                                    <Tooltip
                                      contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius)" }}
                                      labelStyle={{ color: "hsl(var(--foreground))" }}
                                      formatter={(value, name, props) => [`${value} ${props.payload.unit}`, name]}
                                    />
                                    <Legend
                                      wrapperStyle={{ fontSize: '0.8rem', paddingTop: '20px' }}
                                      iconType="circle"
                                      iconSize={10}
                                    />
                                    <Bar dataKey="Antes de GoiLab" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="Después de GoiLab" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={800} />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                          </div>
                          <p className="text-sm text-muted-foreground mt-4 text-center">
                            La gráfica muestra la mejora en las métricas clave del negocio. Se puede observar una reducción significativa del tiempo y los costes, y un aumento de la eficiencia.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="px-6 py-4 bg-secondary/50 border-t flex flex-wrap justify-between items-center gap-4">
                      <p className="text-sm text-muted-foreground flex-1 min-w-[200px]">
                          <span className="font-semibold text-foreground">Resultado:</span> {selectedCase.resultado}
                      </p>
                      <Button onClick={() => { handleOpenContactModal(selectedCase); }}>
                          Aplicar a mi caso <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                 </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
              <DialogContent className="sm:max-w-md bg-card">
                  <DialogHeader>
                      <DialogTitle>Hablemos de tu caso</DialogTitle>
                      <DialogDescription>
                          Nos alegra que te sientas identificado. Déjanos tus datos y nos pondremos en contacto.
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
                          <Button type="button" variant="ghost" onClick={handleCloseModals} disabled={isPending}>Cerrar</Button>
                          <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                                </>
                            ) : (
                                "Enviar"
                            )}
                          </Button>
                      </div>
                    </form>
                  </Form>
              </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}
