export default function Footer() {
  return (
    <footer className="border-t border-earth-300/60 bg-parchment py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gold/60" />
          <p className="font-[family-name:var(--font-display)] text-[0.65rem] tracking-[0.35em] text-earth-700">
            ÉLÉGANCE INTEMPORELLE
          </p>
          <span className="h-px w-10 bg-gold/60" />
        </div>
        <p className="text-sm text-earth-700">
          © {new Date().getFullYear()} Gondor Chic — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

