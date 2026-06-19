// ---------------------------------------------------------------
// Client API minimal pour le backend Spring Boot (Gondor Chic).
// L'URL de base est surchargeable via NEXT_PUBLIC_API_URL.
// ---------------------------------------------------------------

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export type Produit = {
  id: number;
  libelle: string;
  prix: number;
  stock: number;
  image: string | null;
};

export type PanierResponse = {
  message: string;
  produitId: number;
  libelle: string;
  quantite: number;
  stockRestant: number;
};

export type Client = {
  id: number;
  prenom: string;
  nom: string;
  pseudo: string;
};

/** Erreur portant le message renvoye par le backend. */
export class ApiError extends Error {}

async function lireErreur(res: Response): Promise<never> {
  let message = `Erreur serveur (${res.status}).`;
  try {
    const data = await res.json();
    if (data?.message) message = data.message;
  } catch {
    // corps non-JSON : on garde le message par defaut
  }
  throw new ApiError(message);
}

export async function connexion(
  pseudo: string,
  motDePasse: string
): Promise<Client> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pseudo, motDePasse }),
  });
  if (!res.ok) await lireErreur(res);
  return res.json();
}

export async function getProduitDuJour(): Promise<Produit> {
  const res = await fetch(`${API_BASE}/api/produits/du-jour`, {
    cache: "no-store",
  });
  if (!res.ok) await lireErreur(res);
  return res.json();
}

export async function ajouterAuPanier(
  clientId: number,
  produitId: number,
  quantite: number
): Promise<PanierResponse> {
  const res = await fetch(`${API_BASE}/api/panier`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId, produitId, quantite }),
  });
  if (!res.ok) await lireErreur(res);
  return res.json();
}
