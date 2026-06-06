package ht.fds.mbds.alfred.backend.controller;

import ht.fds.mbds.alfred.backend.dto.AjoutPanierRequest;
import ht.fds.mbds.alfred.backend.dto.PanierResponse;
import ht.fds.mbds.alfred.backend.services.PanierService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/panier")
public class PanierController {

    private final PanierService panierService;

    public PanierController(PanierService panierService) {
        this.panierService = panierService;
    }

    @PostMapping
    public PanierResponse ajouter(@Valid @RequestBody AjoutPanierRequest requete) {
        return panierService.ajouter(requete);
    }
}
