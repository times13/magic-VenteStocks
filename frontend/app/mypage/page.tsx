"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ---------------------------------------------------------------
// Données simulées localement (démo UML / génie logiciel)
// Aucune connexion backend, aucune API.
// ---------------------------------------------------------------
const clientSimule = {
  prenom: "Pierre",
  nom: "Cassion",
};

const produitDuJour = {
  libelle: "Casque Bluetooth",
  prix: 45, // USD
  stock: 12,
  image:
    "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=1626&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export default function MyPage() {
  const [quantite, setQuantite] = useState<number>(1);
  const [confirmation, setConfirmation] = useState<string>("");

  const handleAjoutPanier = (e: React.FormEvent) => {
    e.preventDefault();

    if (quantite < 1) {
      setConfirmation("Veuillez saisir une quantité valide.");
      return;
    }
    if (quantite > produitDuJour.stock) {
      setConfirmation(
        `Stock insuffisant. Il ne reste que ${produitDuJour.stock} unité(s).`
      );
      return;
    }

    setConfirmation(
      `✔ ${quantite} × « ${produitDuJour.libelle} » ajouté(s) au panier avec succès.`
    );
  };

  return (
    <>
      <Navbar />

      <main className="flex flex-1 items-start justify-center bg-parchment px-4 py-12">
        <div className="w-full max-w-4xl space-y-10">
          {/* Message de bienvenue */}
          <section className="rounded-lg bg-white px-10 py-8 text-center shadow-md">
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-wider text-ochre">
              Bienvenue, {clientSimule.prenom} {clientSimule.nom}
            </h1>
            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gold/60" />
              <p className="font-[family-name:var(--font-display)] text-[0.7rem] tracking-[0.35em] text-earth-700">
                ESPACE CLIENT
              </p>
              <span className="h-px w-12 bg-gold/60" />
            </div>
            <p className="mt-4 text-earth-700">
              Heureux de vous retrouver dans l&apos;univers Gondor Chic.
            </p>
          </section>

          {/* Produit du jour */}
          <section className="rounded-lg bg-white px-10 py-10 shadow-md">
            <header className="mb-8 text-center">
              <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wider text-ochre">
                Produit du jour
              </h2>
              <div className="mt-3 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-gold/60" />
                <span className="text-gold">◆</span>
                <span className="h-px w-10 bg-gold/60" />
              </div>
            </header>

            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              {/* Image produit */}
              <div className="flex justify-center">
                <div className="overflow-hidden rounded-lg border border-earth-300/60 bg-earth-100 shadow-sm">
                  <Image
                    src={produitDuJour.image}
                    alt={produitDuJour.libelle}
                    width={400}
                    height={400}
                    unoptimized
                    className="h-72 w-72 object-cover"
                  />
                </div>
              </div>

              {/* Détails + formulaire */}
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl tracking-wider text-earth-900">
                  {produitDuJour.libelle}
                </h3>

                <p className="mt-3 text-2xl text-ochre">
                  {produitDuJour.prix.toFixed(2)} <span className="text-base">USD</span>
                </p>

                <p className="mt-2 text-sm text-earth-700">
                  Quantité en stock :{" "}
                  <span className="font-semibold text-earth-900">
                    {produitDuJour.stock}
                  </span>{" "}
                  unités
                </p>

                <form onSubmit={handleAjoutPanier} className="mt-6 space-y-5">
                  <div>
                    <label
                      htmlFor="quantite"
                      className="mb-2 block text-sm text-earth-700"
                    >
                      Quantité
                    </label>
                    <input
                      id="quantite"
                      type="number"
                      min={1}
                      max={produitDuJour.stock}
                      value={quantite}
                      onChange={(e) => setQuantite(Number(e.target.value))}
                      className="w-32 rounded-full border border-earth-300 bg-white px-4 py-2.5 text-earth-900 transition focus:border-ochre focus:outline-none focus:ring-1 focus:ring-ochre"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="rounded-full bg-ochre px-10 py-2.5 text-sm text-white transition-colors hover:bg-ochre-dark focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </form>

                {/* Message de confirmation */}
                {confirmation && (
                  <p
                    role="status"
                    className="mt-6 rounded-md border border-gold/50 bg-earth-100 px-4 py-3 text-sm text-earth-900"
                  >
                    {confirmation}
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

