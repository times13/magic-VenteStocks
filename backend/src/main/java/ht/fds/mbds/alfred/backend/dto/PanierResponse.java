package ht.fds.mbds.alfred.backend.dto;

/**
 * Reponse renvoyee apres un ajout au panier reussi.
 */
public record PanierResponse(
        String message,
        Long produitId,
        String libelle,
        int quantite,
        int stockRestant
) {
}
