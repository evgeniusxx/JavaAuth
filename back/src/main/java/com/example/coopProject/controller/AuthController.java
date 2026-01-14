package com.example.coopProject.controller;

import com.example.coopProject.dto.LoginRequest;
import com.example.coopProject.dto.LoginResponse;
import com.example.coopProject.dto.RegisterRequest;
import com.example.coopProject.dto.UserProfileDTO;
import com.example.coopProject.entity.RefreshToken;
import com.example.coopProject.entity.User;
import com.example.coopProject.security.CustomUserDetails;
import com.example.coopProject.security.JwtUtil;
import com.example.coopProject.service.RefreshTokenService;
import com.example.coopProject.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    public Map<String, String> register(@Valid @RequestBody RegisterRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword())
                .build();

        User saved = userService.create(user);

        String token = jwtUtil.generateToken(saved.getUsername());

        return Map.of("token", token);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {

        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Authentication failed"
            );
        }

        User user = userService.findByUsername(request.getUsername());
        String accessToken = jwtUtil.generateToken(user.getUsername());
        String refreshToken = refreshTokenService.create(user);

        return ResponseEntity.ok(
                new LoginResponse(
                        accessToken,
                        refreshToken,
                        new UserProfileDTO(
                                user.getId(),
                                user.getUsername(),
                                user.getEmail()
                        )
                )
        );
    }

    @PostMapping("/refresh")
    public Map<String, String> refresh(@RequestBody Map<String, String> body) {
        String refreshToken = body.get("refreshToken");

        RefreshToken stored = refreshTokenService.verify(refreshToken);

        String newAccessToken =
                jwtUtil.generateToken(stored.getUser().getUsername());

        return Map.of("accessToken", newAccessToken);
    }

    @PostMapping("/logout")
    public void logout(@RequestBody Map<String, String> body) {
        String refreshToken = body.get("refreshToken");
        RefreshToken token = refreshTokenService.verify(refreshToken);
        refreshTokenService.revoke(token);
    }

    @GetMapping("/me")
    public UserProfileDTO me(@AuthenticationPrincipal CustomUserDetails userDetails) {
        User user = userDetails.getUser();

        return new UserProfileDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail()
        );
    }
}
