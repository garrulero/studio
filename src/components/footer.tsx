import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-secondary border-t border-border/80">
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} GoiLab. Todos los derechos reservados.
        </p>
        <p className="text-xs mt-2 flex items-center justify-center gap-1.5">
          Diseñado con <Heart className="w-4 h-4 text-primary" fill="currentColor" /> para simplificar tu trabajo.
        </p>
      </div>
    </footer>
  );
}
