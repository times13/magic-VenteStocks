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
        creerOuMajProduit(produitRepository, "Reliques d'anneaux", 35.00, 4, false, null);
        creerOuMajProduit(produitRepository, "Épées Anduril", 12.00, 6, true,
                "https://i00.eu/img/602/1024x1024/5bed9kz7/116451.webp");
        creerOuMajProduit(produitRepository, "Cartes de la terre du milieu", 10.00, 9, false, null);
    }

    private void creerOuMajProduit(ProduitRepository produitRepository, String libelle,
                                   double prix, int stock, boolean estDuJour, String image) {
        Produit produit = produitRepository.findByLibelle(libelle)
                .orElseGet(Produit::new);
        produit.setLibelle(libelle);
        produit.setPrix(prix);
        produit.setStock(stock);
        produit.setEstDuJour(estDuJour);
        // On ne remplace l'image existante que si une nouvelle est fournie.
        if (image != null) {
            produit.setImage(image);
        }
        produitRepository.save(produit);
    }
}
