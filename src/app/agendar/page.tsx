
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  email: z.string().email({
    message: 'Por favor, introduce una dirección de email válida.',
  }),
  message: z.string().min(10, {
    message: 'El mensaje debe tener al menos 10 caracteres.'
  }),
});

async function sendWebhook(data: z.infer<typeof formSchema>) {
  const webhookUrl = 'https://n8n.garrulero.xyz/webhook/contacto-goilab';

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al enviar el formulario.');
  }

  // No necesitamos procesar la respuesta, solo saber si fue exitosa.
  return;
}


export default function AgendarPage() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: 'Hola, quiero agendar una cita para que me ayudéis a optimizar mi negocio.',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await sendWebhook(values);
        toast({
          title: "¡Mensaje enviado!",
          description: "Hemos recibido tus datos. Nos pondremos en contacto contigo pronto.",
        });
        form.reset();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo enviar tu mensaje. Por favor, inténtalo de nuevo o contacta a kaixo@goilab.com.",
        });
      }
    });
  }

  return (
    <section className="w-full py-16 lg:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 flex justify-center">
        <Card className="max-w-xl w-full bg-card shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Agenda tu cita</CardTitle>
            <CardDescription className="text-muted-foreground pt-2">
              Rellena el formulario y nos pondremos en contacto contigo para encontrar el mejor momento.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre y apellidos" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email de contacto</FormLabel>
                      <FormControl>
                        <Input placeholder="tu.email@ejemplo.com" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>¿En qué podemos ayudarte?</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[120px]" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                    <Button type="submit" size="lg" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...
                            </>
                        ) : (
                            <>
                                Enviar y agendar <ArrowRight className="ml-2 w-5 h-5" />
                            </>
                        )}
                    </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
