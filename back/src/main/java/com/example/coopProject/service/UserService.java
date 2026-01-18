package com.example.coopProject.service;

import com.example.coopProject.entity.User;
import com.example.coopProject.exception.ApiException;
import com.example.coopProject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User create(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new ApiException(
                    HttpStatus.CONFLICT,
                    "Пользователь с таким логином уже существует"
            );
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new ApiException(
                    HttpStatus.CONFLICT,
                    "Пользователь с таким email уже существует"
            );
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setActive(true);

        return userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

//    public User update(Long id, User updatedUser) {
//        User existing = findById(id);
//        existing.setUsername(updatedUser.getUsername());
//        existing.setEmail(updatedUser.getEmail());
//        return userRepository.save(existing);
//    }
}

