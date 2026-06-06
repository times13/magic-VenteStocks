package ht.fds.mbds.alfred.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Article du catalogue Gondor Chic (ex. « Épées Anduril »).
 */
@Entity
@Table(name = "produit")
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String libelle;

    /** Prix unitaire en USD. */
    @Column(nullable = false)
    private double prix;

    /** Quantite disponible en stock. */
    @Column(nullable = false)
    private int stock;

    @Column(length = 1024)
    private String image;

    /** Indique si ce produit est le « produit du jour » (un seul a la fois). */
    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean estDuJour;

    public Produit() {
    }

    public Produit(String libelle, double prix, int stock, String image) {
        this(libelle, prix, stock, image, false);
    }

    public Produit(String libelle, double prix, int stock, String image, boolean estDuJour) {
        this.libelle = libelle;
        this.prix = prix;
        this.stock = stock;
        this.image = image;
        this.estDuJour = estDuJour;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public boolean isEstDuJour() {
        return estDuJour;
    }

    public void setEstDuJour(boolean estDuJour) {
        this.estDuJour = estDuJour;
    }
}
