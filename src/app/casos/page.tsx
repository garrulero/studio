
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import casesData from '@/data/casos.json';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, BarChart, CheckCircle, TrendingUp, X, XCircle } from 'lucide-react';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const areas = [
  'Todos',
  'Atención al cliente',
  'Organización',
  'Comunicación interna',
  'Gestión del tiempo',
  'Documentación',
  'Control de tareas',
  'Seguimiento',
];

interface CaseMetric {
  nombre: string;
  antes: number;
  despues: number;
  unidad: string;
}

interface Case {
  titulo: string;
  resumen: string;
  area: string;
  problemas: string[];
  antes: string;
  despues: string;
  resultado: string;
  metricas: CaseMetric[];
}

export default function CasosPage() {
  const [filter, setFilter] = useState('Todos');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const filteredCases = casesData.filter(
    (story) => filter === 'Todos' || story.area === filter
  );

  const handleOpenContactModal = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsContactModalOpen(true);
  };
  
  const handleOpenDetailsModal = (caseItem: Case) => {
    setSelectedCase(caseItem);
  };

  const handleCloseModals = () => {
    setIsContactModalOpen(false);
    setSelectedCase(null);
  };

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
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Casos que podrían ser el tuyo</h1>
            <p className="text-lg text-muted-foreground mt-6 max-w-3xl mx-auto">
              Filtra por área para encontrar soluciones a problemas como los tuyos.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {areas.map((area) => (
              <Button
                key={area}
                variant={filter === area ? 'default' : 'outline'}
                onClick={() => setFilter(area)}
                className="rounded-full"
              >
                {area}
              </Button>
            ))}
          </div>
          <div id="galeria-casos" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((story) => (
              <Card key={story.titulo} className="bg-card shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col border border-border/50">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <Badge variant="secondary" className="mb-4 self-start">{story.area}</Badge>
                  <h3 className="text-xl font-bold mb-2">{story.titulo}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{story.resumen}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {story.problemas.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs font-normal bg-background">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                    <Button onClick={() => handleOpenDetailsModal(story)} variant="outline" className="w-full">
                      Ver detalles
                    </Button>
                    <Button onClick={() => handleOpenContactModal(story)} className="w-full">
                      ¿Te identificas?
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {selectedCase && (
        <>
          <Dialog open={!!selectedCase && !isContactModalOpen} onOpenChange={(isOpen) => !isOpen && handleCloseModals()}>
            <DialogContent className="sm:max-w-4xl bg-card text-foreground p-0 overflow-hidden">
                <div className="absolute inset-0 animate-sky-ascent bg-[length:600px_600px] z-0"></div>
                <div className="relative z-10 bg-card/80 backdrop-blur-sm h-full overflow-y-auto max-h-[90vh]">
                  <DialogHeader className="p-6 pb-0">
                      <DialogTitle className="text-2xl font-bold">{selectedCase.titulo}</DialogTitle>
                      <Badge variant="secondary" className="self-start mt-1">{selectedCase.area}</Badge>
                  </DialogHeader>
                  <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-red-600"><XCircle className="w-5 h-5" /> El problema</h4>
                        <p className="text-muted-foreground">{selectedCase.antes}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-green-600"><CheckCircle className="w-5 h-5 animate-glow" /> La solución</h4>
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
              <DialogContent className="sm:max-w-[425px] bg-card">
                  <DialogHeader>
                      <DialogTitle>Hablemos de tu caso</DialogTitle>
                      <DialogDescription>
                          Nos alegra que te sientas identificado. Déjanos tus datos y nos pondremos en contacto.
                      </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                              Nombre
                          </Label>
                          <Input id="name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                              Email
                          </Label>
                          <Input id="email" type="email" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="message" className="text-right">
                              Mensaje
                          </Label>
                          <Textarea
                              id="message"
                              className="col-span-3 min-h-[100px]"
                              defaultValue={`Hola, he visto el caso '${selectedCase?.titulo}' y me he sentido muy identificado. ¿Podemos hablar para ver si tenéis una solución parecida para mí?`}
                          />
                      </div>
                  </div>
                   <div className="flex justify-end gap-2">
                      <Button type="button" variant="ghost" onClick={handleCloseModals}>Cerrar</Button>
                      <Button type="submit">Enviar</Button>
                   </div>
              </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}
