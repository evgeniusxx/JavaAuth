package com.example.coopProject.service;

import com.example.coopProject.entity.RefreshToken;
import com.example.coopProject.entity.User;
import com.example.coopProject.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    private String generateToken() {
        return UUID.randomUUID().toString();
    }

    private Instant generateExpiryDate() {
        return Instant.now().plus(7, ChronoUnit.DAYS);
    }

    // Создание(или обновление) refresh token
    public String create(User user) {
        RefreshToken token = refreshTokenRepository.findByUser(user)
                .orElseGet(() -> {
                    RefreshToken t = new RefreshToken();
                    t.setUser(user);
                    return t;
                });

        token.setTokenHash(generateToken());
        token.setExpiresAt(generateExpiryDate());
        token.setRevoked(false);

        refreshTokenRepository.save(token);
        return token.getTokenHash();
    }

    // Проверка refresh token
    public RefreshToken verify(String token) {
        RefreshToken stored = refreshTokenRepository
                .findByTokenHash(token)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED,
                                "Invalid refresh token"
                        )
                );

        if (stored.isRevoked()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Refresh token revoked"
            );
        }

        if (stored.getExpiresAt().isBefore(Instant.now())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Refresh token expired"
            );
        }
        return stored;
    }

    // Отзыв конкретного refresh token
    public void revoke(RefreshToken token) {
        token.setRevoked(true);
        refreshTokenRepository.save(token);
    }
}
