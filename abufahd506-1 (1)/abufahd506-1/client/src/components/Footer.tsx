export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border py-8" data-testid="footer">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-muted-foreground" data-testid="text-copyright">
            © 2025 تشاليح المحاكي. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}