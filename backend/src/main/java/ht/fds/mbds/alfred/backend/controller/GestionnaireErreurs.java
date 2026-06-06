package ht.fds.mbds.alfred.backend.controller;

import ht.fds.mbds.alfred.backend.exception.IdentifiantsInvalidesException;
import ht.fds.mbds.alfred.backend.exception.RessourceIntrouvableException;
import ht.fds.mbds.alfred.backend.exception.StockInsuffisantException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

/**
 * Traduit les exceptions metier en reponses HTTP lisibles cote frontend.
 */
@RestControllerAdvice
public class GestionnaireErreurs {

    @ExceptionHandler(RessourceIntrouvableException.class)
    public ResponseEntity<Map<String, String>> introuvable(RessourceIntrouvableException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", ex.getMessage()));
    }

    @ExceptionHandler(IdentifiantsInvalidesException.class)
    public ResponseEntity<Map<String, String>> identifiantsInvalides(IdentifiantsInvalidesException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", ex.getMessage()));
    }

    @ExceptionHandler(StockInsuffisantException.class)
    public ResponseEntity<Map<String, String>> stockInsuffisant(StockInsuffisantException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("message", ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> validation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(err -> err.getDefaultMessage())
                .orElse("Requete invalide.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", message));
    }
}
