"use client";

import { useState } from "react";

export default function HomePage() {
  const [pseudo, setPseudo] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: appel API d'authentification
    console.log("Connexion avec:", { pseudo, motDePasse });
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      {/* En-tête marque */}
      <div className="mb-10 flex flex-col items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white shadow-lg">
          MV
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Magic Vente Stock
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Gestion des ventes et du stock
        </p>
      </div>

      {/* Formulaire de connexion */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <h2 className="mb-6 text-center text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Connexion
        </h2>

        <div className="mb-4">
          <label
            htmlFor="pseudo"
            className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Pseudo
          </label>
          <input
            id="pseudo"
            type="text"
            required
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Entrez votre pseudo"
            className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="motDePasse"
            className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Mot de passe
          </label>
          <input
            id="motDePasse"
            type="password"
            required
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            placeholder="Entrez votre mot de passe"
            className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

