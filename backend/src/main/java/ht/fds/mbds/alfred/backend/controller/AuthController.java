package ht.fds.mbds.alfred.backend.controller;

import ht.fds.mbds.alfred.backend.dto.ClientResponse;
import ht.fds.mbds.alfred.backend.dto.ConnexionRequest;
import ht.fds.mbds.alfred.backend.model.UserEntity;
import ht.fds.mbds.alfred.backend.services.UserServices;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Point d'entree REST pour la user story « S'identifier ».
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserServices userServices;

    public AuthController(UserServices userServices) {
        this.userServices = userServices;
    }

    @PostMapping("/login")
    public ClientResponse login(@Valid @RequestBody ConnexionRequest requete) {
        UserEntity client = userServices.authentifier(requete.pseudo(), requete.motDePasse());
        return ClientResponse.depuis(client);
    }
}
