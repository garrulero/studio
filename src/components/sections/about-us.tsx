import { CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const whatWeDo = [
  'Nos sumergimos en tu negocio para entender tus verdaderos retos.',
  'Diseñamos soluciones simples, efectivas y a tu medida.',
  'Implementamos solo las herramientas que tu equipo adoptará con facilidad.',
  'Te capacitamos para que tengas total autonomía y control.',
  'Nos obsesionamos con entregar resultados rápidos y medibles.',
];

const whatWeDontDo = [
  'Utilizar jerga técnica para parecer más inteligentes.',
  'Proponer sistemas innecesariamente complejos.',
  'Atarte con contratos de permanencia o costes ocultos.',
  'Desaparecer después de la implementación.',
  'Ofrecer la misma solución a problemas diferentes.',
];

export function AboutUsSection() {
  return (
    <section id="sobre-nosotros" className="w-full py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Nuestra promesa: Claridad y Resultados</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Creemos en una colaboración honesta y un trabajo que habla por sí mismo.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-card border border-border/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-green-400">
                <CheckCircle2 className="w-8 h-8" />
                Nuestro Compromiso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {whatWeDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-1 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-card border border-border/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-red-500">
                <XCircle className="w-8 h-8" />
                Lo que Evitamos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {whatWeDontDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 mt-1 text-muted-foreground shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
