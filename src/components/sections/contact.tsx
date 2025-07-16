import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, Phone, Clock, ArrowRight } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contacto" className="w-full py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">¿Listo para el siguiente paso?</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Hablemos sobre tus desafíos y exploremos juntos cómo podemos ayudarte. Sin compromiso.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card shadow-lg">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                       <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <a href="mailto:hola@goilab.es" className="text-muted-foreground hover:text-primary">hola@goilab.es</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Teléfono</h4>
                      <a href="tel:+34600000000" className="text-muted-foreground hover:text-primary">+34 600 000 000</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="bg-primary/10 p-3 rounded-lg">
                       <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Horario</h4>
                      <p className="text-muted-foreground">Lunes a Viernes: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-background/50 p-8 rounded-b-lg md:rounded-r-lg md:rounded-bl-none flex flex-col justify-center items-center text-center">
                  <h3 className="text-2xl font-bold mb-4">Agenda una consultoría gratuita</h3>
                  <p className="text-muted-foreground mb-6">Reserva 15 minutos en nuestro calendario. Escucharemos tus necesidades y te daremos una primera valoración honesta.</p>
                  <Button size="lg" asChild className="font-semibold">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Agendar ahora <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
