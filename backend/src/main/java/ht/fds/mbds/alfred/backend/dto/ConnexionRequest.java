package ht.fds.mbds.alfred.backend.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * Requete d'identification : pseudo + mot de passe.
 */
public record ConnexionRequest(
        @NotBlank(message = "Le pseudo est obligatoire.") String pseudo,
        @NotBlank(message = "Le mot de passe est obligatoire.") String motDePasse
) {
}
