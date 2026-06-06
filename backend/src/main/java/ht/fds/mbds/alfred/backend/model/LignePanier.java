package ht.fds.mbds.alfred.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.Instant;

/**
 * Une ligne de panier : un produit ajoute avec une quantite donnee.
 */
@Entity
@Table(name = "ligne_panier")
public class LignePanier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "produit_id", nullable = false)
    private Produit produit;

    private int quantite;

    private Instant ajouteLe = Instant.now();

    public LignePanier() {
    }

    public LignePanier(Produit produit, int quantite) {
        this.produit = produit;
        this.quantite = quantite;
        this.ajouteLe = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public Produit getProduit() {
        return produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }

    public Instant getAjouteLe() {
        return ajouteLe;
    }
}
