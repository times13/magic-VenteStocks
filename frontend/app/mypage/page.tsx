"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ajouterAuPanier,
  getProduitDuJour,
  ApiError,
  type Produit,
  type Client,
} from "@/lib/api";

// ---------------------------------------------------------------
// Le produit du jour ET le client connecte proviennent desormais
// du backend Spring Boot (le client est lu depuis sessionStorage,
// ou il a ete place apres une identification reussie).
// ---------------------------------------------------------------

export default function MyPage() {
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);

  const [produit, setProduit] = useState<Produit | null>(null);
  const [chargement, setChargement] = useState(true);
  const [erreurChargement, setErreurChargement] = useState("");

  const [quantite, setQuantite] = useState<number>(1);
  const [confirmation, setConfirmation] = useState<string>("");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  // Recuperation du client connecte ; redirection vers l'accueil si absent.
  useEffect(() => {
    const stocke = sessionStorage.getItem("client");
    if (!stocke) {
      router.replace("/");
      return;
    }
    setClient(JSON.parse(stocke) as Client);
  }, [router]);

  // Recuperation du produit du jour au montage.
  useEffect(() => {
    getProduitDuJour()
      .then(setProduit)
      .catch((e: unknown) =>
        setErreurChargement(
          e instanceof ApiError
            ? e.message
            : "Impossible de contacter le serveur Gondor Chic."
        )
      )
      .finally(() => setChargement(false));
  }, []);

  const handleAjoutPanier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!produit) return;

    if (quantite < 1) {
      setConfirmation("Veuillez saisir une quantité valide.");
      return;
    }

    setEnvoiEnCours(true);
    setConfirmation("");
    try {
      const reponse = await ajouterAuPanier(produit.id, quantite);
      // On reflete le stock restant renvoye par le backend.
      setProduit({ ...produit, stock: reponse.stockRestant });
      setQuantite(1);
      setConfirmation(`✔ ${reponse.message}`);
    } catch (e: unknown) {
      setConfirmation(
        e instanceof ApiError
          ? e.message
          : "Une erreur est survenue lors de l'ajout au panier."
      );
    } finally {
      setEnvoiEnCours(false);
    }
  };

  // Tant que le client n'est pas charge, on evite d'afficher la page
  // (une redirection vers l'accueil est en cours s'il n'est pas connecte).
  if (!client) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="flex flex-1 items-start justify-center bg-parchment px-4 py-12">
        <div className="w-full max-w-4xl space-y-10">
          {/* Message de bienvenue */}
          <section className="rounded-lg bg-white px-10 py-8 text-center shadow-md">
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-wider text-ochre">
              Bienvenue, {client.prenom} {client.nom}
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

            {chargement && (
              <p className="text-center text-earth-700">Chargement du produit…</p>
            )}

            {!chargement && erreurChargement && (
              <p
                role="alert"
                className="mx-auto max-w-md rounded-md border border-ochre/50 bg-earth-100 px-4 py-3 text-center text-sm text-earth-900"
              >
                {erreurChargement}
              </p>
            )}

            {!chargement && produit && (
              <div className="grid gap-10 md:grid-cols-2 md:items-center">
                {/* Image produit */}
                <div className="flex justify-center">
                  <div className="overflow-hidden rounded-lg border border-earth-300/60 bg-earth-100 shadow-sm">
                    {produit.image && (
                      <Image
                        src={produit.image}
                        alt={produit.libelle}
                        width={400}
                        height={400}
                        unoptimized
                        className="h-72 w-72 object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Détails + formulaire */}
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl tracking-wider text-earth-900">
                    {produit.libelle}
                  </h3>

                  <p className="mt-3 text-2xl text-ochre">
                    {produit.prix.toFixed(2)} <span className="text-base">USD</span>
                  </p>

                  <p className="mt-2 text-sm text-earth-700">
                    Quantité en stock :{" "}
                    <span className="font-semibold text-earth-900">
                      {produit.stock}
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
                        max={produit.stock}
                        value={quantite}
                        onChange={(e) => setQuantite(Number(e.target.value))}
                        className="w-32 rounded-full border border-earth-300 bg-white px-4 py-2.5 text-earth-900 transition focus:border-ochre focus:outline-none focus:ring-1 focus:ring-ochre"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={envoiEnCours || produit.stock < 1}
                        className="rounded-full bg-ochre px-10 py-2.5 text-sm text-white transition-colors hover:bg-ochre-dark focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {envoiEnCours
                          ? "Ajout en cours…"
                          : produit.stock < 1
                            ? "Rupture de stock"
                            : "Ajouter au panier"}
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
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
