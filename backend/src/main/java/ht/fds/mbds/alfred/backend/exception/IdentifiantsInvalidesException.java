package ht.fds.mbds.alfred.backend.exception;

/**
 * Levee lorsque le couple pseudo / mot de passe ne correspond a aucun client.
 */
public class IdentifiantsInvalidesException extends RuntimeException {

    public IdentifiantsInvalidesException(String message) {
        super(message);
    }
}
