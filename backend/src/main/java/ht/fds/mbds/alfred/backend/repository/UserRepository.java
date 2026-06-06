package ht.fds.mbds.alfred.backend.repository;

import ht.fds.mbds.alfred.backend.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    /** Recherche un client par son pseudo (identifiant de connexion). */
    Optional<UserEntity> findByPseudo(String pseudo);
}
