
import { Button } from '@/components/ui/button';
import { ArrowRight, Handshake, Users, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export function AboutUsSection() {
  return (
    <section id="sobre-nosotros" className="w-full py-16 lg:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Un compañero de equipo, no un proveedor
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Fundé GoiLab para ayudar a las pymes como la tuya, con soluciones prácticas y un acompañamiento cercano y real.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12 text-center">
            <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Handshake className="w-8 h-8 text-primary"/>
                </div>
                <h3 className="text-xl font-semibold">Cercanía</h3>
                <p className="text-muted-foreground mt-2">Hablamos tu idioma, entendemos tus problemas y nos implicamos en tus objetivos.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                     <CheckCircle2 className="w-8 h-8 text-primary"/>
                </div>
                <h3 className="text-xl font-semibold">Soluciones Simples</h3>
                <p className="text-muted-foreground mt-2">Implementamos solo lo que necesitas, con un impacto que puedas ver y medir desde el primer día.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                     <Users className="w-8 h-8 text-primary"/>
                </div>
                <h3 className="text-xl font-semibold">Acompañamiento</h3>
                <p className="text-muted-foreground mt-2">Te formamos y te damos soporte para que domines las herramientas y seas autónomo.</p>
            </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/sobre-nosotros">
              Conoce nuestra historia <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
