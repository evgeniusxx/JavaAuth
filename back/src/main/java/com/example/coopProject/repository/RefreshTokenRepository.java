package com.example.coopProject.repository;

import com.example.coopProject.entity.RefreshToken;
import com.example.coopProject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByTokenHash(String tokenHash);

    Optional<RefreshToken> findByUser(User user);
}
