package ht.fds.mbds.alfred.backend.services;

import ht.fds.mbds.alfred.backend.exception.IdentifiantsInvalidesException;
import ht.fds.mbds.alfred.backend.exception.RessourceIntrouvableException;
import ht.fds.mbds.alfred.backend.model.UserEntity;
import ht.fds.mbds.alfred.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

/**
 * Logique d'identification des clients (user story « S'identifier »).
 */
@Service
public class UserServices {

    private final UserRepository userRepository;

    public UserServices(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Verifie le couple pseudo / mot de passe.
     *
     * @return le client authentifie
     * @throws IdentifiantsInvalidesException si le pseudo est inconnu ou le mot de passe incorrect
     */
    public UserEntity authentifier(String pseudo, String motDePasse) {
        UserEntity client = userRepository.findByPseudo(pseudo)
                .orElseThrow(() -> new IdentifiantsInvalidesException(
                        "Pseudo ou mot de passe incorrect."));

        if (!client.getMotDePasse().equals(motDePasse)) {
            throw new IdentifiantsInvalidesException("Pseudo ou mot de passe incorrect.");
        }

        return client;
    }

    /**
     * Recupere un client par son identifiant.
     *
     * @throws RessourceIntrouvableException si aucun client ne correspond
     */
    public UserEntity getParId(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RessourceIntrouvableException(
                        "Client introuvable (id=" + id + ")."));
    }
}
