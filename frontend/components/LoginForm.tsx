"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { connexion, ApiError } from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();
  const [pseudo, setPseudo] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur("");
    setEnvoiEnCours(true);
    try {
      const client = await connexion(pseudo, motDePasse);
      // Le client identifie est conserve pour personnaliser la page d'accueil.
      sessionStorage.setItem("client", JSON.stringify(client));
      router.push("/mypage");
    } catch (e: unknown) {
      setErreur(
        e instanceof ApiError
          ? e.message
          : "Impossible de contacter le serveur Gondor Chic."
      );
    } finally {
      setEnvoiEnCours(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="pseudo" className="mb-2 block text-sm text-earth-700">
          Pseudo
        </label>
        <input
          id="pseudo"
          type="text"
          required
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          className="w-full rounded-full border border-earth-300 bg-white px-4 py-2.5 text-earth-900 transition focus:border-ochre focus:outline-none focus:ring-1 focus:ring-ochre"
        />
      </div>

      <div>
        <label htmlFor="motDePasse" className="mb-2 block text-sm text-earth-700">
          Mot de passe
        </label>
        <input
          id="motDePasse"
          type="password"
          required
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          className="w-full rounded-full border border-earth-300 bg-white px-4 py-2.5 text-earth-900 transition focus:border-ochre focus:outline-none focus:ring-1 focus:ring-ochre"
        />
      </div>

      {erreur && (
        <p
          role="alert"
          className="rounded-md border border-ochre/50 bg-earth-100 px-4 py-3 text-center text-sm text-earth-900"
        >
          {erreur}
        </p>
      )}

      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={envoiEnCours}
          className="rounded-full bg-ochre px-10 py-2.5 text-sm text-white transition-colors hover:bg-ochre-dark focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {envoiEnCours ? "Connexion…" : "S'identifier"}
        </button>
      </div>
    </form>
  );
}
