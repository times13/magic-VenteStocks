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
        <div className="flex flex-1 items-center justify-center bg-parchment px-4 py-12">
            <div className="w-full max-w-md rounded-lg bg-white px-10 py-12 shadow-md">
                {/* En-tête marque */}
                <div className="mb-10 text-center">
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

                {/* Formulaire de connexion */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="pseudo"
                            className="mb-2 block text-sm text-earth-700"
                        >
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
                        <label
                            htmlFor="motDePasse"
                            className="mb-2 block text-sm text-earth-700"
                        >
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

                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            className="rounded-full bg-ochre px-10 py-2.5 text-sm text-white transition-colors hover:bg-ochre-dark focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                        >
                            S&apos;identifier
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}