package ht.fds.mbds.alfred.backend.exception;

/**
 * Levee lorsqu'une quantite demandee depasse le stock disponible.
 */
public class StockInsuffisantException extends RuntimeException {

    public StockInsuffisantException(String message) {
        super(message);
    }
}
