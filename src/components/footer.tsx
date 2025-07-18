
'use client';

import { Button } from "./ui/button";
import { logError } from "@/lib/error-logger";

export function Footer() {

  const handleTestError = () => {
    try {
      // Forzamos un error de referencia
      // @ts-ignore
      nonExistentFunction();
    } catch (error: any) {
      // El manejador global en layout.tsx se encargará de capturar este console.error
      console.error('Error de prueba intencionado:', error);
    }
  };

  return (
    <footer className="w-full bg-secondary border-t">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center gap-4">
        <img src="/logos/solo logo sin fondo.svg" alt="GoiLab Logo" className="h-10 w-auto" />
        <p className="text-sm text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} GoiLab. Todos los derechos reservados.
        </p>
        {process.env.NODE_ENV === 'development' && (
            <Button variant="destructive" size="sm" onClick={handleTestError} className="mt-4">
                Probar envío de error
            </Button>
        )}
      </div>
    </footer>
  );
}
