package ht.fds.mbds.alfred.backend.services;

import ht.fds.mbds.alfred.backend.dto.AjoutPanierRequest;
import ht.fds.mbds.alfred.backend.dto.PanierResponse;
import ht.fds.mbds.alfred.backend.exception.StockInsuffisantException;
import ht.fds.mbds.alfred.backend.model.LignePanier;
import ht.fds.mbds.alfred.backend.model.Produit;
import ht.fds.mbds.alfred.backend.repository.LignePanierRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PanierService {

    private final ProduitService produitService;
    private final LignePanierRepository lignePanierRepository;

    public PanierService(ProduitService produitService,
                         LignePanierRepository lignePanierRepository) {
        this.produitService = produitService;
        this.lignePanierRepository = lignePanierRepository;
    }

    /**
     * Ajoute un produit au panier apres controle du stock disponible.
     * Le stock du produit est decremente (reservation) de la quantite ajoutee.
     */
    @Transactional
    public PanierResponse ajouter(AjoutPanierRequest requete) {
        Produit produit = produitService.getParId(requete.produitId());

        if (requete.quantite() > produit.getStock()) {
            throw new StockInsuffisantException(
                    "Stock insuffisant. Il ne reste que " + produit.getStock()
                            + " unite(s) de « " + produit.getLibelle() + " ».");
        }

        produit.setStock(produit.getStock() - requete.quantite());
        lignePanierRepository.save(new LignePanier(produit, requete.quantite()));

        return new PanierResponse(
                requete.quantite() + " × « " + produit.getLibelle()
                        + " » ajouté(s) au panier avec succès.",
                produit.getId(),
                produit.getLibelle(),
                requete.quantite(),
                produit.getStock());
    }
}
