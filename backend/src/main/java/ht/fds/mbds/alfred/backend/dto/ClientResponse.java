package ht.fds.mbds.alfred.backend.dto;

import ht.fds.mbds.alfred.backend.model.UserEntity;

/**
 * Donnees du client renvoyees au frontend apres identification
 * (sans le mot de passe).
 */
public record ClientResponse(
        Long id,
        String prenom,
        String nom,
        String pseudo
) {
    public static ClientResponse depuis(UserEntity client) {
        return new ClientResponse(
                client.getId(),
                client.getPrenom(),
                client.getNom(),
                client.getPseudo());
    }
}
