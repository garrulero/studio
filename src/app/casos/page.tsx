
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import casesData from '@/data/casos.json';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, BarChart, CheckCircle, TrendingDown, TrendingUp, XCircle } from 'lucide-react';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

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
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const filteredCases = casesData.filter(
    (story) => filter === 'Todos' || story.area === filter
  );

  const handleOpenContactModal = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsDetailsModalOpen(false);
    setIsContactModalOpen(true);
  };
  
  const handleOpenDetailsModal = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsDetailsModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsContactModalOpen(false);
    setIsDetailsModalOpen(false);
    setSelectedCase(null);
  };

  const chartData = selectedCase?.metricas.map(m => ({
    name: m.nombre,
    Antes: m.antes,
    Después: m.despues,
    unit: m.unidad
  }));

  return (
    <>
      <section id="casos-de-exito" className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight animate-glow [text-shadow:0_0_20px_white]">Casos que podrían ser el tuyo</h1>
            <p className="text-lg text-muted-foreground mt-6 max-w-3xl mx-auto">
              ¿Qué quieres mejorar?
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {areas.map((area) => (
              <Button
                key={area}
                variant={filter === area ? 'default' : 'secondary'}
                onClick={() => setFilter(area)}
                className={`rounded-full transition-all ${filter === area ? 'bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white' : ''}`}
              >
                {area}
              </Button>
            ))}
          </div>
          <div id="galeria-casos" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((story) => (
              <Card key={story.titulo} className="bg-card border-border/60 flex flex-col p-6 rounded-lg transition-all hover:border-primary/80">
                <CardContent className="p-0 flex flex-col flex-grow">
                  <Badge variant="secondary" className="mb-4 self-start">{story.area}</Badge>
                  <h3 className="text-xl font-bold mb-2">{story.titulo}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{story.resumen}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {story.problemas.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                    <Button onClick={() => handleOpenDetailsModal(story)} variant="secondary" className="w-full">
                      Ver detalles
                    </Button>
                    <Button onClick={() => handleOpenContactModal(story)} className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white">
                      ¿Quieres esta solución?
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
          <Dialog open={isDetailsModalOpen} onOpenChange={(isOpen) => !isOpen && handleCloseModals()}>
            <DialogContent className="sm:max-w-4xl bg-card border-border/20 text-foreground p-0">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-2xl font-bold">{selectedCase.titulo}</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-red-400"><XCircle className="w-5 h-5" /> El problema</h4>
                      <p className="text-muted-foreground">{selectedCase.antes}</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-green-400"><CheckCircle className="w-5 h-5" /> La solución</h4>
                      <p className="text-muted-foreground">{selectedCase.despues}</p>
                    </div>
                  </div>
                  <Card className="bg-secondary/50 border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><BarChart className="w-5 h-5" />Métricas de Impacto</CardTitle>
                      <CardDescription>Comparativa antes y después.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-40">
                         <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={chartData}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`}/>
                                <Tooltip
                                  contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                                  labelStyle={{ color: "hsl(var(--foreground))" }}
                                  itemStyle={{ color: "hsl(var(--primary))" }}
                                  formatter={(value, name, props) => [`${value} ${props.payload.unit}`, name]}
                                />
                                <Bar dataKey="Antes" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Después" fill="#22c55e" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                        {selectedCase.metricas.map(metric => {
                            const improvement = ((metric.despues - metric.antes) / metric.antes) * 100;
                            const isPositive = metric.despues > metric.antes;
                            const isReductionGood = (metric.nombre.toLowerCase().includes('tiempo') || metric.nombre.toLowerCase().includes('errores') || metric.nombre.toLowerCase().includes('coste') || metric.nombre.toLowerCase().includes('perdidas'));
                            
                            return (
                                <div key={metric.nombre}>
                                    <p className="text-sm text-muted-foreground">{metric.nombre}</p>
                                    <p className="text-2xl font-bold flex items-center justify-center gap-1">
                                        { isReductionGood ? (
                                           <TrendingDown className={`w-5 h-5 ${improvement < 0 ? 'text-green-400' : 'text-red-400'}`} />
                                        ) : (
                                            <TrendingUp className={`w-5 h-5 ${improvement > 0 ? 'text-green-400' : 'text-red-400'}`} />
                                        )}
                                        {Math.abs(improvement).toFixed(0)}%
                                    </p>
                                </div>
                            )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                 <div className="px-6 py-4 bg-secondary/30 border-t flex justify-between items-center">
                   <p className="text-sm text-muted-foreground max-w-lg">
                      <span className="font-semibold text-foreground">Resultado:</span> {selectedCase.resultado}
                   </p>
                   <Button onClick={() => handleOpenContactModal(selectedCase)} className="bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white">
                      Aplicar a mi caso <ArrowRight className="ml-2 w-4 h-4" />
                   </Button>
                 </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isContactModalOpen} onOpenChange={(isOpen) => !isOpen && handleCloseModals()}>
              <DialogContent className="sm:max-w-[425px] bg-card border-border/20">
                  <DialogHeader>
                      <DialogTitle>Contacto</DialogTitle>
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
                              defaultValue={`Hola, he visto el caso '${selectedCase.titulo}' y me he sentido muy identificado. ¿Podemos hablar para ver si tenéis una solución parecida para mí?`}
                          />
                      </div>
                  </div>
                   <div className="flex justify-end gap-2">
                      <Button type="button" variant="secondary" onClick={handleCloseModals}>Cerrar</Button>
                      <Button type="submit" className="bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white">Enviar</Button>
                   </div>
              </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}
