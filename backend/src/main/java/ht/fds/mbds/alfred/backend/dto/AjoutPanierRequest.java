package ht.fds.mbds.alfred.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * Corps de la requete d'ajout au panier.
 */
public record AjoutPanierRequest(
        @NotNull(message = "L'identifiant du client est obligatoire.")
        Long clientId,

        @NotNull(message = "L'identifiant du produit est obligatoire.")
        Long produitId,

        @Min(value = 1, message = "La quantite doit etre d'au moins 1.")
        int quantite
) {
}
