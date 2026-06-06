# Tests fonctionnels — Sprint 2 (Gondor Chic)

Ce chapitre décrit les tests pour les exigences fonctionnelles. Il reprend chaque
User Story fonctionnelle produite dans le sprint et définit ses scénarios de test.

Dans le sprint 2 est ajoutée la user story **« S'identifier »**. Elle concerne le
cas d'utilisation **« Passer commande en ligne »**.

---

## Jeu de données métier

Des données métier (clients et produits) préexistent dans le système pour rendre
les tests significatifs. Elles sont insérées automatiquement au démarrage du
backend (`DataInitializer`).

### Trois clients

| Prénom  | Nom             | Pseudo  | Mot de passe |
|---------|-----------------|---------|--------------|
| Boromir | Son of Denethor | Boromir | boromir1234  |
| Bilbo   | Baggins         | Bilbo   | bilbo1345    |
| Gandalf | legris          | gandalf | gandalf1677  |

### Trois produits

| Libellé                       | Prix | Quantité en stock | Est du jour |
|-------------------------------|------|-------------------|-------------|
| Reliques d'anneaux            | 35   | 4                 | Non         |
| Épées Anduril                 | 12   | 6                 | **Oui**     |
| Cartes de la terre du milieu  | 10   | 9                 | Non         |

---

## Cas d'utilisation « Passer commande en ligne »

### User story fonctionnelle « Accès au site »

#### Scénario F1 — Accéder à la page d'accueil

| Étape de test    | Action                                                                 | Vérification                                                                                                                                   | Résultat attendu |
|------------------|------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| Accéder au site  | Via un navigateur (Google Chrome), saisir l'URL du site (`http://localhost:3000`) | Vérifier l'affichage de la page d'accueil avec le contenu fonctionnel suivant :<br>• Nom et logo de la marque (« Gondor Chic »)<br>• Champ de saisie du pseudo<br>• Champ de saisie du mot de passe<br>• Bouton d'action « S'identifier » | Nom et logo : Done<br>Champ pseudo : Done<br>Champ mot de passe : Done<br>S'identifier : Done |

---

### User story fonctionnelle « Identification »

#### Scénario F2 — Identification réussie (client Boromir)

| Étape de test         | Action                                            | Vérification                                                                                                                                                                                                 | Résultat attendu |
|-----------------------|---------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| Précondition          | Scénario F1                                       |                                                                                                                                                                                                            |                  |
| Saisir le pseudo et le mot de passe | Saisir `Boromir` et `boromir1234` puis cliquer sur « S'identifier » | Vérifier l'affichage de la page d'accueil personnalisée avec le contenu fonctionnel suivant :<br>**Message de bienvenue :**<br>• Prénom : Boromir<br>• Nom : Son of Denethor<br>**Produit du jour :**<br>• Libellé : Épées Anduril<br>• Quantité en stock : 6<br>• Image : affichée | Bienvenue, Boromir Son of Denethor : Done<br>Produit du jour Épées Anduril (stock 6) : Done |

#### Scénario F3 — Identification réussie (client Bilbo)

| Étape de test         | Action                                          | Vérification                                                                                                                                                                          | Résultat attendu |
|-----------------------|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| Précondition          | Scénario F1                                     |                                                                                                                                                                                     |                  |
| Saisir le pseudo et le mot de passe | Saisir `Bilbo` et `bilbo1345` puis cliquer sur « S'identifier » | **Message de bienvenue :**<br>• Prénom : Bilbo<br>• Nom : Baggins<br>**Produit du jour :** identique à F2 (Épées Anduril, stock 6, image affichée)                                  | Bienvenue, Bilbo Baggins : Done<br>Produit du jour idem F2 : Done |

#### Scénario F4 — Identification échouée (mauvais mot de passe)

| Étape de test         | Action                                                  | Vérification                                                                                                                                                              | Résultat attendu |
|-----------------------|---------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| Précondition          | Scénario F1                                             |                                                                                                                                                                         |                  |
| Saisir un mot de passe incorrect | Saisir `Boromir` et `mauvaisMotDePasse` puis cliquer sur « S'identifier » | • L'utilisateur **reste** sur la page d'accueil (pas d'accès à la page perso)<br>• Un message d'erreur s'affiche : « Pseudo ou mot de passe incorrect. »<br>• Aucun message de bienvenue n'est affiché | Accès refusé : Done<br>Message d'erreur affiché : Done |

> **Variante F4 bis — pseudo inconnu :** saisir `Sauron` / `peuimporte` produit
> le même résultat (« Pseudo ou mot de passe incorrect. »), le système ne
> divulguant pas si c'est le pseudo ou le mot de passe qui est en cause.

---

## Notes techniques (pour la soutenance)

- **Vérification réelle du mot de passe** : l'identification appelle le endpoint
  REST `POST /api/auth/login` du backend Spring Boot. Le service
  `UserServices.authentifier(pseudo, motDePasse)` compare les identifiants aux
  données en base et lève une erreur **HTTP 401** si le couple est invalide.
- **Personnalisation** : après une identification réussie, le client renvoyé par
  l'API (prénom, nom, pseudo — **sans** le mot de passe) est conservé côté
  frontend (`sessionStorage`) et affiché dans le message de bienvenue de la page
  perso. Sans identification, l'accès direct à `/mypage` redirige vers l'accueil.
- **Produit du jour** : déterminé par l'attribut `estDuJour` du produit (un seul
  produit est marqué), et non plus par l'ordre d'insertion.
