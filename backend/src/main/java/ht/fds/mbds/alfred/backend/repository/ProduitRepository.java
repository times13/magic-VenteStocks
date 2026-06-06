package ht.fds.mbds.alfred.backend.repository;

import ht.fds.mbds.alfred.backend.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProduitRepository extends JpaRepository<Produit, Long> {

    /** Le « produit du jour » : celui marque comme tel (un seul a la fois). */
    Optional<Produit> findFirstByEstDuJourTrue();

    /** Recherche par libelle (utilise pour l'amorcage idempotent des donnees). */
    Optional<Produit> findByLibelle(String libelle);
}
