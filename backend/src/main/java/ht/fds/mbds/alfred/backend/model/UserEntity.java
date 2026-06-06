package ht.fds.mbds.alfred.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Un client du site Gondor Chic, capable de s'identifier (pseudo + mot de passe).
 */
@Entity
@Table(name = "client")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String prenom;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false, unique = true)
    private String pseudo;

    /**
     * Mot de passe. Stocke en clair pour ce projet pedagogique (sprint 2).
     * En production il faudrait un hachage (BCrypt) via Spring Security.
     */
    @Column(nullable = false)
    private String motDePasse;

    public UserEntity() {
    }

    public UserEntity(String prenom, String nom, String pseudo, String motDePasse) {
        this.prenom = prenom;
        this.nom = nom;
        this.pseudo = pseudo;
        this.motDePasse = motDePasse;
    }

    public Long getId() {
        return id;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }
}
