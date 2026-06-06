package ht.fds.mbds.alfred.backend.services;

import ht.fds.mbds.alfred.backend.exception.RessourceIntrouvableException;
import ht.fds.mbds.alfred.backend.model.Produit;
import ht.fds.mbds.alfred.backend.repository.ProduitRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {

    private final ProduitRepository produitRepository;

    public ProduitService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    public List<Produit> listerTous() {
        return produitRepository.findAll();
    }

    public Produit getProduitDuJour() {
        return produitRepository.findFirstByEstDuJourTrue()
                .orElseThrow(() -> new RessourceIntrouvableException(
                        "Aucun produit du jour n'est disponible."));
    }

    public Produit getParId(Long id) {
        return produitRepository.findById(id)
                .orElseThrow(() -> new RessourceIntrouvableException(
                        "Produit introuvable (id=" + id + ")."));
    }
}
