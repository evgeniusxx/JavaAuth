package com.example.coopProject.controller;

import com.example.coopProject.dto.LoginRequest;
import com.example.coopProject.dto.LoginResponse;
import com.example.coopProject.dto.UserProfileDTO;
import com.example.coopProject.entity.User;
import com.example.coopProject.security.JwtUtil;
import com.example.coopProject.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;

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

        String token = jwtUtil.generateToken(user.getUsername());

        return ResponseEntity.ok(
                new LoginResponse(
                        token,
                        new UserProfileDTO(
                                user.getId(),
                                user.getUsername(),
                                user.getEmail()
                        )
                )
        );
    }
}
