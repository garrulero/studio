'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, PlusCircle } from 'lucide-react';

const stories = [
  {
    id: 1,
    title: 'Consultora Redujo Reuniones un 40%',
    category: 'Consultoría',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'office meeting',
    summary: 'Implementamos un sistema de gestión de proyectos que centralizó la comunicación, reduciendo la necesidad de reuniones de seguimiento.',
    details: 'La consultora "Innovate Solutions" sufría de "reunionitis" aguda. El equipo pasaba más de 10 horas semanales en reuniones. Tras analizar sus flujos de trabajo, implementamos Asana y una metodología de comunicación asíncrona. En 2 meses, las reuniones se redujeron en un 40% y la productividad aumentó un 25%.',
  },
  {
    id: 2,
    title: 'E-commerce Automatiza su Logística',
    category: 'E-commerce',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'warehouse logistics',
    summary: 'Automatizamos la gestión de pedidos y envíos, ahorrando al equipo 15 horas de trabajo manual a la semana.',
    details: '"Tienda Fresh" gestionaba sus pedidos de forma manual, lo que generaba errores y retrasos. Integramos su Shopify con un sistema de gestión de inventario y envíos. El resultado fue una reducción del 90% en errores de envío y un equipo que podía centrarse en el crecimiento del negocio en lugar de en tareas repetitivas.',
  },
  {
    id: 3,
    title: 'Agencia de Marketing Unifica sus Herramientas',
    category: 'Servicios',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'marketing agency',
    summary: 'Migramos 5 herramientas de gestión a una sola plataforma, ahorrando más de 200€ al mes en suscripciones.',
    details: 'La agencia "Creative Spark" usaba una herramienta para tareas, otra para CRM, otra para facturas... un caos. Realizamos una auditoría y migramos todo a una única plataforma (Notion) personalizada para sus necesidades. Además de ahorrar dinero, el equipo ahora tiene una visión 360º de cada cliente.',
  },
];

const categories = ['Todos', 'Consultoría', 'E-commerce', 'Servicios'];

export function SuccessStoriesSection() {
  const [filter, setFilter] = useState('Todos');

  const filteredStories = stories.filter(
    (story) => filter === 'Todos' || story.category === filter
  );

  return (
    <section id="casos-de-exito" className="w-full py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Resultados, no promesas</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Mira cómo hemos ayudado a empresas como la tuya a trabajar de forma más inteligente.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? 'default' : 'outline'}
              onClick={() => setFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group bg-background border-2 border-dashed flex flex-col items-center justify-center text-center p-8 hover:border-primary hover:bg-primary/5 transition-all">
                <PlusCircle className="w-12 h-12 text-muted-foreground group-hover:text-primary mb-4 transition-colors"/>
                <CardTitle className="text-2xl">Tu empresa aquí</CardTitle>
                <p className="text-muted-foreground mt-2 mb-4">Conviértete en nuestro próximo caso de éxito.</p>
                <Button asChild>
                    <a href="#contacto">
                        Quiero ser el próximo <ArrowRight className="ml-2 w-4 h-4"/>
                    </a>
                </Button>
            </Card>
          {filteredStories.map((story) => (
             <Dialog key={story.id}>
              <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer group flex flex-col h-full shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-background">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                       <Image src={story.imageUrl} alt={story.title} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" data-ai-hint={story.dataAiHint} />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <Badge variant="outline" className="mb-2">{story.category}</Badge>
                    <h3 className="text-xl font-bold">{story.title}</h3>
                    <p className="text-muted-foreground mt-2">{story.summary}</p>
                  </CardContent>
                   <CardFooter>
                     <span className="text-sm font-semibold text-primary group-hover:underline">
                        Ver detalles <ArrowRight className="inline-block ml-1 w-4 h-4"/>
                    </span>
                  </CardFooter>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <Badge variant="outline" className="mb-2 w-fit">{story.category}</Badge>
                  <DialogTitle className="text-2xl">{story.title}</DialogTitle>
                  <DialogDescription>
                    {story.details}
                  </DialogDescription>
                </DialogHeader>
                 <div className="relative h-64 w-full mt-4 rounded-lg overflow-hidden">
                    <Image src={story.imageUrl} alt={story.title} layout="fill" objectFit="cover" data-ai-hint={story.dataAiHint} />
                 </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
