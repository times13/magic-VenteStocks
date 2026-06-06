package ht.fds.mbds.alfred.backend.controller;

import ht.fds.mbds.alfred.backend.model.Produit;
import ht.fds.mbds.alfred.backend.services.ProduitService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
public class ProduitController {

    private final ProduitService produitService;

    public ProduitController(ProduitService produitService) {
        this.produitService = produitService;
    }

    @GetMapping
    public List<Produit> tous() {
        return produitService.listerTous();
    }

    @GetMapping("/du-jour")
    public Produit produitDuJour() {
        return produitService.getProduitDuJour();
    }

    @GetMapping("/{id}")
    public Produit parId(@PathVariable Long id) {
        return produitService.getParId(id);
    }
}
