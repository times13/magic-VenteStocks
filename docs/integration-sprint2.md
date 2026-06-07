# Intégration et tests d'intégration — Sprint 2 (Gondor Chic)

Ce chapitre décrit **comment les composants exécutables de l'application sont
intégrés** dans l'environnement de développement, puis **comment on vérifie que
l'application complète se déploie et s'exécute correctement**.

---

## Composants exécutables

L'application est composée de **trois composants exécutables** qui doivent être
intégrés ensemble.

| #  | Composant exécutable     | Stack                                   | Port | Rôle                                                                 |
|----|--------------------------|-----------------------------------------|------|---------------------------------------------------------------------|
| C1 | **Base de données**      | PostgreSQL 16, base `gondor_chic`       | 5432 | Persistance (clients, produits, lignes de panier)                   |
| C2 | **Backend / API REST**   | Spring Boot 4.0.6 · Java 21 · Maven     | 8081 | Logique métier, endpoints `/api/auth/login`, `/api/produits/du-jour`, `/api/panier` |
| C3 | **Frontend**             | Next.js 16 · React 19                   | 3000 | Interface (identification, page perso, produit du jour)             |

Le frontend (C3) appelle le backend (C2) via `NEXT_PUBLIC_API_URL=http://localhost:8081`,
et le backend lit/écrit dans la base (C1). **L'intégration consiste à faire
fonctionner cette chaîne C3 → C2 → C1 ensemble.**

---

## 1. Définir l'intégration — obtenir les composants exécutables dans l'IDE

> *« Comment vais-je obtenir ce(s) composant(s) exécutable(s) dans mon IDE ? »*

### Étape 0 — Récupérer le code source

```bash
git clone https://github.com/times13/magic-VenteStocks.git
cd magic-VenteStocks
```

Le dépôt contient les trois composants : `backend/`, `frontend/`, et les scripts
de base de données.

### C1 — Base de données PostgreSQL (composant « support »)

1. Installer **PostgreSQL 16** (service Windows `postgresql-x64-16`).
2. Créer la base au préalable (PostgreSQL ne la crée pas automatiquement) :
   ```sql
   CREATE DATABASE gondor_chic;
   ```
3. S'assurer que le rôle `postgres` a le mot de passe attendu (`postgres`).
4. Le **schéma (tables) est généré automatiquement** par Hibernate au premier
   démarrage du backend (`spring.jpa.hibernate.ddl-auto=update`) — aucun script
   DDL manuel.

### C2 — Backend Spring Boot, dans IntelliJ IDEA

1. `File → Open…` → sélectionner le dossier **`backend/`** → IntelliJ détecte le
   projet **Maven** et télécharge les dépendances (`pom.xml`).
2. Vérifier le **JDK 21** dans `Project Structure → SDK`.
3. Créer une **Run Configuration** « Spring Boot » sur `BackendApplication`, avec :
   - **Variable d'environnement** : `DB_PASSWORD=postgres`
   - **Argument programme** : `--server.port=8081` (le 8080 est occupé par IntelliJ)
   - **Options VM** (machine à mémoire contrainte) : `-Xmx450m -Xms64m -XX:+UseSerialGC`
4. Lancer → l'API écoute sur `http://localhost:8081` et le `DataInitializer`
   amorce le jeu de données métier.

### C3 — Frontend Next.js, dans VS Code

1. Ouvrir le dossier **`frontend/`**.
2. Installer les dépendances : `npm install`.
3. Créer `frontend/.env.local` pointant vers le backend :
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8081
   ```
4. Lancer le serveur de dev : `npm run dev` → interface sur `http://localhost:3000`.

> **L'intégration est réussie** lorsque les trois composants tournent
> simultanément (PostgreSQL en service, backend sur 8081, frontend sur 3000) et
> que le frontend communique avec le backend qui lit en base.

---

## 2. Définir les tests d'intégration

> *« Comment vérifier que l'ensemble des composants — qui forment l'application
> complète — (a) se déploient et (b) s'exécutent bien ? »*

On distingue deux familles, conformément à l'énoncé.

### 2.A — Tests de DÉPLOIEMENT (« Se déploient »)

Objectif : prouver que **chaque composant démarre** et que **les connexions
inter-composants s'établissent**. On ne teste pas encore le métier, seulement la
mise en route de la chaîne.

| ID | Test de déploiement                          | Action                                                        | Résultat attendu                                              |
|----|----------------------------------------------|--------------------------------------------------------------|--------------------------------------------------------------|
| D1 | PostgreSQL est disponible                    | `Get-Service postgresql-x64-16` + écoute port 5432           | Service **Running**, port 5432 en écoute                     |
| D2 | La base `gondor_chic` existe                 | `psql -l`                                                     | La base apparaît dans la liste                               |
| D3 | Le backend démarre **et se connecte à la base** | Lancer la Run Config → lire le log                        | `Started BackendApplication in … seconds`, aucune erreur DataSource |
| D4 | Le schéma est créé / amorcé (C2 ↔ C1)        | `SELECT count(*) FROM produit;`                              | 3 produits, 3 clients présents (amorçage `DataInitializer`)  |
| D5 | L'API répond                                 | `GET http://localhost:8081/api/produits/du-jour`            | **HTTP 200** + JSON du produit du jour                       |
| D6 | Le frontend se compile et se sert            | `npm run dev` puis ouvrir `http://localhost:3000`           | Page d'accueil affichée, build sans erreur                   |
| D7 | Le frontend atteint le backend (C3 ↔ C2)     | Charger une page qui appelle l'API                          | Pas d'erreur réseau/CORS dans la console navigateur          |

✅ **Déploiement validé** si D1 → D7 sont tous au vert : les trois composants
tournent et se parlent.

### 2.B — Tests d'EXÉCUTION de bout en bout (« S'exécutent bien »)

Objectif : prouver que l'application complète **réalise le métier à travers toute
la chaîne** C3 → C2 → C1. Chaque test traverse les trois composants.

| ID | Scénario d'intégration             | Parcours C3 → C2 → C1                                                        | Résultat attendu                                                                 |
|----|------------------------------------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| I1 | **Identification réussie**         | Saisir `Boromir` / `boromir1234` → `POST /api/auth/login` → comparaison en base | HTTP 200, page perso « Bienvenue, Boromir Son of Denethor », **mot de passe jamais renvoyé** |
| I2 | **Identification échouée**         | `Boromir` / `mauvaisMotDePasse` → `POST /api/auth/login`                     | **HTTP 401**, message « Pseudo ou mot de passe incorrect. », reste sur l'accueil |
| I3 | **Pseudo inconnu**                 | `Sauron` / `peuimporte`                                                      | Même réponse que I2 (pas de divulgation pseudo vs mot de passe)                  |
| I4 | **Produit du jour affiché**        | Page perso → `GET /api/produits/du-jour` → lecture base (`est_du_jour = true`) | « Épées Anduril », image affichée, **stock lu en base en temps réel**           |
| I5 | **Ajout au panier (cas nominal)**  | Commander une quantité ≤ stock → `POST /api/panier` `{produitId, quantite}` | HTTP 201/200, ligne créée en base, stock décrémenté                             |
| I6 | **Contrôle de stock (cas d'erreur)** | Commander une quantité > stock disponible                                  | **HTTP 409 (Conflict)**, aucune ligne créée, stock inchangé                     |
| I7 | **Persistance après redémarrage**  | Modifier un stock, **redémarrer le backend**, recharger l'UI                | La valeur persiste (PostgreSQL + `DataInitializer` qui n'écrase plus le stock)  |
| I8 | **Accès protégé**                  | Accéder directement à `/mypage` **sans** s'identifier                       | Redirection vers l'accueil                                                       |

✅ **Exécution validée** si I1 → I8 sont conformes : l'application complète
réalise les cas d'utilisation de bout en bout.

---

## 3. Niveaux de test mis en œuvre

- **Tests d'intégration automatisés (C2)** : `@SpringBootTest`
  (cf. `BackendApplicationTests.contextLoads()`) avec base **H2 en mémoire**
  (`create-drop`) — valide le câblage backend + JPA sans dépendre de PostgreSQL.
- **Tests d'intégration manuels de bout en bout (C1 + C2 + C3)** : exécution des
  scénarios I1 → I8 via le navigateur (Chrome) sur la pile réellement déployée —
  c'est le tableau 2.B, prolongement des tests fonctionnels du Sprint 2
  (voir `tests-fonctionnels-sprint2.md`).
