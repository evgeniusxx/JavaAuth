package com.example.coopProject.controller;

import com.example.coopProject.dto.RegisterRequest;
import com.example.coopProject.entity.User;
import com.example.coopProject.security.JwtUtil;
import com.example.coopProject.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class RegisterController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public Map<String, String> register(@Valid @RequestBody RegisterRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword())
                .build();

        User saved = userService.create(user);

        String token = jwtUtil.generateToken(saved.getUsername());
        userService.saveToken(saved.getUsername(), token);

        return Map.of("token", token);
    }
}

