'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import casesData from '@/data/casos.json';

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

interface Case {
  titulo: string;
  resumen: string;
  area: string;
  problemas: string[];
  antes: string;
  despues: string;
  resultado: string;
}

export default function CasosPage() {
  const [filter, setFilter] = useState('Todos');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCases = casesData.filter(
    (story) => filter === 'Todos' || story.area === filter
  );

  const handleOpenModal = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
  };

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
              <Card key={story.titulo} className="bg-card border-border/20 flex flex-col p-6 rounded-lg">
                <CardContent className="p-0 flex flex-col flex-grow">
                  <Badge variant="secondary" className="mb-4 self-start">{story.area}</Badge>
                  <h3 className="text-xl font-bold mb-2">{story.titulo}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{story.resumen}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {story.problemas.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <Button onClick={() => handleOpenModal(story)} className="w-full mt-auto bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white">
                    ¿Quieres esta solución?
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {selectedCase && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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
                    <Button type="button" variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
                    <Button type="submit" className="bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white">Enviar</Button>
                 </div>
            </DialogContent>
        </Dialog>
      )}
    </>
  );
}
