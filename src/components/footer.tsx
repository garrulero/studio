import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-secondary">
      <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} GoiLab. Todos los derechos reservados.
        </p>
        <p className="text-xs mt-2 flex items-center justify-center gap-1">
          Diseñado con <Heart className="w-3 h-3 text-primary" /> para simplificar tu trabajo.
        </p>
      </div>
    </footer>
  );
}
