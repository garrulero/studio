import { CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const whatWeDo = [
  'Escuchamos para entender tu negocio a fondo.',
  'Proponemos soluciones sencillas y efectivas.',
  'Implementamos herramientas que realmente usarás.',
  'Te formamos para que seas 100% autónomo.',
  'Nos enfocamos en resultados medibles y rápidos.',
];

const whatWeDontDo = [
  'Venderte humo con jerga tecnológica incomprensible.',
  'Crear procesos complejos que nadie entiende.',
  'Atarte a nosotros con contratos de permanencia.',
  'Desaparecer una vez hemos cobrado.',
  'Ofrecer soluciones genéricas que no se adaptan a ti.',
];

export function AboutUsSection() {
  return (
    <section id="sobre-nosotros" className="w-full py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Así somos en GoiLab</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Creemos en la honestidad radical y en el trabajo bien hecho. Sin rodeos.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-card border border-border/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-green-400">
                <CheckCircle2 className="w-8 h-8" />
                Lo que SÍ hacemos
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
                Lo que NO hacemos
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
