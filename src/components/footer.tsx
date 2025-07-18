
'use client';

import { logError } from "@/lib/error-logger";
import { Button } from "./ui/button";

export function Footer() {

  const handleTestError = () => {
    try {
      // Forzamos un error de referencia
      // @ts-ignore
      nonExistentFunction();
    } catch (error: any) {
      console.error('Error de prueba intencionado:', error);
      // Opcionalmente, podemos llamar a logError directamente para asegurar el envío
      logError({
        message: 'Este es un error de prueba manual: ' + error.message,
        stack: error.stack,
        componentStack: 'BotonFooter > onClick'
      });
      alert('Error de prueba generado y enviado. Revisa tu webhook de n8n.');
    }
  }

  return (
    <footer className="w-full bg-secondary border-t">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center gap-4">
        <img src="/logos/solo logo sin fondo.svg" alt="GoiLab Logo" className="h-10 w-auto" />
        <p className="text-sm text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} GoiLab. Todos los derechos reservados.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <Button variant="outline" size="sm" onClick={handleTestError} className="mt-4">
            Probar envío de error
          </Button>
        )}
      </div>
    </footer>
  );
}
