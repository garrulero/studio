
'use client';

import { triggerTestError } from "@/lib/error-logger";
import { Button } from "./ui/button";

export function Footer() {

  const handleTestError = () => {
    console.log("Triggering test error...");
    triggerTestError();
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
