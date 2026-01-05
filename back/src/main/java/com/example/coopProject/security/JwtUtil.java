package com.example.coopProject.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKeyString;

    @Value("${jwt.expiration-ms}")
    private long expirationMs;

    private SecretKey secretKey;

    @PostConstruct
    protected void init() {
        // Проверяем, что JWT секрет установлен
        if (secretKeyString == null || secretKeyString.trim().isEmpty()) {
            throw new IllegalStateException(
                    "JWT_SECRET не установлен! " +
                    "Установите переменную окружения JWT_SECRET или добавьте её в .env файл. " +
                    "Для генерации секрета используйте: openssl rand -hex 32"
            );
        }

        // Keys.hmacShaKeyFor требует минимум 256 бит(32 байта)
        // SHA-256 для создания ключа фиксированной длины из секретной строки
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] keyBytes = digest.digest(secretKeyString.getBytes(StandardCharsets.UTF_8));
            secretKey = Keys.hmacShaKeyFor(keyBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Failed to initialize JWT secret key", e);
        }
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(secretKey)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean isTokenValid(String token, String username) {
        try {
            return extractUsername(token).equals(username);
        } catch (Exception e) {
            return false;
        }
    }
}