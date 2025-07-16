import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, MessageCircleQuestion } from 'lucide-react';

const faqSections = {
  Servicios: [
    {
      question: '¿En qué me puede ayudar GoiLab exactamente?',
      answer:
        'Te ayudamos a resolver problemas concretos en tu negocio: tareas duplicadas, papeles por todas partes, citas que se olvidan, pedidos descontrolados, etc. Automatizamos procesos, mejoramos tu organización y seleccionamos solo las herramientas que necesitas.',
    },
    {
      question: '¿Trabajáis con algún software en concreto?',
      answer:
        'No estamos casados con ninguna herramienta. Elegimos contigo lo que mejor se adapta a tu caso. A veces usamos lo que ya tienes, otras veces te proponemos algo nuevo.',
    },
    {
      question: '¿También dais soporte después de implementar?',
      answer:
        'Sí. Podemos acompañarte con soporte continuo, formación o incluso ajustes mensuales si lo necesitas. Tú eliges el nivel de acompañamiento.',
    },
  ],
  Procesos: [
    {
      question: '¿Cómo es el proceso si decido trabajar con vosotros?',
      answer:
        'Empezamos con una conversación para entender tu negocio. Luego hacemos un pequeño diagnóstico, proponemos soluciones claras y, si te encaja, empezamos con una implementación rápida.',
    },
    {
      question: '¿Tengo que tener conocimientos técnicos?',
      answer:
        'Para nada. Nos encargamos de que todo funcione de forma simple. Nuestro trabajo es traducir lo técnico a lo que tú necesitas.',
    },
    {
      question: '¿Tenéis packs o precios cerrados?',
      answer:
        'Sí, puedes ver nuestros planes base en la sección de Tarifas. Y si tu caso es especial, podemos hacerte una propuesta a medida.',
    },
  ],
  'Dudas comunes': [
    {
      question: '¿Y si no sé ni por dónde empezar?',
      answer:
        'Es lo más habitual. Si tienes sensación de caos, mucho mejor: ahí es donde más podemos ayudarte.',
    },
    {
      question:
        '¿Esto no será muy caro para una pyme pequeña como la mía?',
      answer:
        'Lo vemos mucho como una inversión: muchas veces, pequeñas mejoras suponen grandes ahorros de tiempo y dinero. Podemos empezar por algo sencillo y avanzar paso a paso.',
    },
    {
      question: '¿Trabajáis con negocios de mi sector?',
      answer:
        'Muy probablemente sí. Y si no, no pasa nada: nuestra metodología se adapta. Lo importante no es tu sector, sino cómo trabajas y qué quieres mejorar.',
    },
  ],
};

export default function FaqPage() {
  return (
    <section id="faq" className="w-full py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Preguntas Frecuentes
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Resolvemos algunas de las dudas más habituales. Si no encuentras la
            tuya, contáctanos.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-1 gap-12">
            {Object.entries(faqSections).map(([category, faqs]) => (
              <div key={category}>
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <MessageCircleQuestion className="w-7 h-7 text-primary" />
                  {category}
                </h3>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-2"
                >
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-secondary/50 rounded-lg px-4 border-b-0"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-xl font-semibold">¿Tienes otra pregunta?</h3>
          <p className="text-muted-foreground mt-2 mb-6">
            Escríbenos o reserva una llamada rápida con nosotros.
          </p>
          <Button asChild size="lg">
            <Link href="/agendar">
              Contactar ahora <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
