import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function Page() {
  return (
    <div className="flex flex-1 items-center justify-center bg-parchment px-4 py-12">
      <div className="w-full max-w-md rounded-lg bg-white px-10 py-12 shadow-md">
        {/* En-tête marque */}
        <div className="mb-10 text-center">
          <Image
            src="/logo.png"
            alt="Gondor Chic"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h1 className="flex items-center justify-center gap-3 font-[family-name:var(--font-display)] text-4xl font-medium tracking-wider text-ochre">
            <span>Gondor</span>
            <span className="text-gold text-2xl">◆</span>
            <span>Chic</span>
          </h1>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gold/60" />
            <p className="font-[family-name:var(--font-display)] text-[0.7rem] tracking-[0.35em] text-earth-700">
              ÉLÉGANCE INTEMPORELLE
            </p>
            <span className="h-px w-12 bg-gold/60" />
          </div>
        </div>

        {/* Formulaire de connexion (Client Component) */}
        <LoginForm />
      </div>
    </div>
  );
}