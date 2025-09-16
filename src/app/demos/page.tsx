
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, FlaskConical } from 'lucide-react';
import Link from 'next/link';

export default function DemosPage() {
  return (
    <section className="w-full py-16 lg:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="max-w-4xl text-center">
          <FlaskConical className="mx-auto h-12 w-12 text-primary mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Prueba el potencial de GoiLab
          </h1>
          <p className="text-lg text-muted-foreground mt-6 max-w-3xl mx-auto">
            Aquí encontrarás aplicaciones de demostración para que puedas experimentar de primera mano cómo la automatización y la inteligencia artificial pueden transformar tu negocio.
          </p>

          <div className="mt-12">
            <Card className="bg-card text-left shadow-lg">
                <CardHeader>
                    <CardTitle>Demos disponibles próximamente</CardTitle>
                    <CardDescription>
                        Estamos preparando ejemplos interactivos para que puedas probar nuestras soluciones en acción. Vuelve pronto para descubrirlos.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        Mientras tanto, si tienes una idea o un problema que te gustaría resolver, la mejor forma de empezar es hablando. Agenda una cita y te mostraremos cómo podríamos crear una solución a tu medida.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/agendar">
                            Agendar una cita <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
