package ht.fds.mbds.alfred.backend.config;

import ht.fds.mbds.alfred.backend.model.Produit;
import ht.fds.mbds.alfred.backend.model.UserEntity;
import ht.fds.mbds.alfred.backend.repository.ProduitRepository;
import ht.fds.mbds.alfred.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Amorce le jeu de donnees metier du sprint 2 (3 clients + 3 produits) au demarrage.
 *
 * <p>L'amorcage est idempotent : chaque enregistrement est cree seulement s'il
 * n'existe pas deja (recherche par pseudo / par libelle), ce qui permet de
 * completer une base partiellement remplie sans creer de doublon.
 */
@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedDonneesMetier(UserRepository userRepository,
                                        ProduitRepository produitRepository) {
        return args -> {
            seedClients(userRepository);
            seedProduits(produitRepository);
        };
    }

    /** Les trois clients du jeu de donnees metier. */
    private void seedClients(UserRepository userRepository) {
        creerClientSiAbsent(userRepository, "Boromir", "Son of Denethor", "Boromir", "boromir1234");
        creerClientSiAbsent(userRepository, "Bilbo", "Baggins", "Bilbo", "bilbo1345");
        creerClientSiAbsent(userRepository, "Gandalf", "legris", "gandalf", "gandalf1677");
    }

    private void creerClientSiAbsent(UserRepository userRepository,
                                     String prenom, String nom, String pseudo, String motDePasse) {
        if (userRepository.findByPseudo(pseudo).isEmpty()) {
            userRepository.save(new UserEntity(prenom, nom, pseudo, motDePasse));
        }
    }

    /** Les trois produits du jeu de donnees metier (un seul est « du jour »). */
    private void seedProduits(ProduitRepository produitRepository) {
        creerProduitSiAbsent(produitRepository, "Reliques d'anneaux", 35.00, 4, false, null);
        creerProduitSiAbsent(produitRepository, "Épées Anduril", 12.00, 6, true,
                "https://i00.eu/img/602/1024x1024/5bed9kz7/116451.webp");
        creerProduitSiAbsent(produitRepository, "Cartes de la terre du milieu", 10.00, 9, false, null);
    }

    private void creerProduitSiAbsent(ProduitRepository produitRepository, String libelle,
                                      double prix, int stock, boolean estDuJour, String image) {
        // On ne touche jamais a un produit existant : son stock, son prix et son
        // statut « du jour » evoluent a l'execution et ne doivent pas etre ecrases
        // a chaque demarrage. On cree uniquement le produit s'il est absent.
        if (produitRepository.findByLibelle(libelle).isPresent()) {
            return;
        }
        Produit produit = new Produit();
        produit.setLibelle(libelle);
        produit.setPrix(prix);
        produit.setStock(stock);
        produit.setEstDuJour(estDuJour);
        produit.setImage(image);
        produitRepository.save(produit);
    }
}
