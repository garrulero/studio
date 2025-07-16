export function Footer() {
  return (
    <footer className="w-full bg-secondary border-t">
      <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} GoiLab. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
