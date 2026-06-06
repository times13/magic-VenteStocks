package ht.fds.mbds.alfred.backend.exception;

/**
 * Levee lorsqu'une ressource demandee (ex. un produit) n'existe pas.
 */
public class RessourceIntrouvableException extends RuntimeException {

    public RessourceIntrouvableException(String message) {
        super(message);
    }
}
