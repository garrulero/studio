
import { CheckCircle2, Handshake, Users, XCircle, Puzzle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const whatWeDo = [
  'Nos sumergimos en tu negocio para entender tus verdaderos retos.',
  'Diseñamos soluciones simples, efectivas y a tu medida.',
  'Implementamos solo las herramientas que tu equipo adoptará con facilidad.',
  'Te capacitamos para que tengas total autonomía y control.',
  'Nos obsesionamos con entregar resultados rápidos y medibles.',
];

const whatWeDontDo = [
  'Prometerte soluciones mágicas que lo arreglan todo sin esfuerzo.',
  'Utilizar jerga técnica para parecer más inteligentes.',
  'Proponer sistemas innecesariamente complejos o que no necesitas.',
  'Desaparecer después de la implementación.',
  'Ofrecer la misma solución a problemas diferentes.',
];

export default function SobreNosotrosPage() {
  return (
    <section id="sobre-nosotros" className="w-full py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        
        <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">¿Quién está detrás de GoiLab?</h1>
            <p className="text-lg text-muted-foreground mt-6">
                Soy Raúl, y fundé GoiLab con una misión clara: ayudar a las pymes de aquí, a las que levantan la persiana cada día, a trabajar de forma más inteligente.
            </p>
            <p className="mt-4 text-muted-foreground">
                Conozco de primera mano el caos de los papeles, los emails interminables y la sensación de no tener control. Por eso, mi enfoque es darte soluciones prácticas y reales, sin humo ni tecnicismos innecesarios. Quiero que sientas que GoiLab es un compañero más en tu equipo, alguien que entiende tus problemas y te da las herramientas para resolverlos.
            </p>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Nuestra promesa: Claridad y Resultados</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Creemos en una colaboración honesta y un trabajo que habla por sí mismo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-center">
            <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Handshake className="w-8 h-8 text-primary"/>
                </div>
                <h3 className="text-xl font-semibold">Cercanía</h3>
                <p className="text-muted-foreground mt-2">Hablamos tu idioma, entendemos tus problemas y nos convertimos en parte de tu equipo.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                     <CheckCircle2 className="w-8 h-8 text-primary"/>
                </div>
                <h3 className="text-xl font-semibold">Enfoque Práctico</h3>
                <p className="text-muted-foreground mt-2">No es magia. Implementamos soluciones simples y medibles, pero requieren un proceso y adaptación.</p>
            </div>
             <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                     <Puzzle className="w-8 h-8 text-primary"/>
                </div>
                <h3 className="text-xl font-semibold">Compromiso Mutuo</h3>
                <p className="text-muted-foreground mt-2">Para lograr el objetivo, necesitaremos tu implicación y tiempo. Los mejores resultados se consiguen juntos.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                     <Users className="w-8 h-8 text-primary"/>
                </div>
                <h3 className="text-xl font-semibold">Acompañamiento Real</h3>
                <p className="text-muted-foreground mt-2">No desaparecemos. Te formamos y te damos soporte para que saques el máximo partido a las herramientas.</p>
            </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-card border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-green-600">
                <CheckCircle2 className="w-8 h-8" />
                Nuestro Compromiso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {whatWeDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-1 text-primary shrink-0" />
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-card border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-red-600">
                <XCircle className="w-8 h-8" />
                Lo que Evitamos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {whatWeDontDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 mt-1 text-muted-foreground shrink-0" />
                    <span className="text-foreground/90">{item}</span>
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
