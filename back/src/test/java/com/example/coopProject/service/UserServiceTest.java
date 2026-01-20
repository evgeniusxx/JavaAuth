package com.example.coopProject.service;

import com.example.coopProject.exception.ApiException;
import com.example.coopProject.entity.User;
import com.example.coopProject.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class) 
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");
        testUser.setPassword("plainPassword");
        testUser.setActive(false);
    }

    @Test
    void create_WhenUsernameExists_ShouldThrowApiException() {
        when(userRepository.existsByUsername(testUser.getUsername())).thenReturn(true);
        
        ApiException exception = assertThrows(ApiException.class,
                () -> userService.create(testUser));

        assertEquals(HttpStatus.CONFLICT, exception.getStatus());
        assertEquals("Пользователь с таким логином уже существует", exception.getMessage());
        verify(userRepository).existsByUsername(testUser.getUsername());
        verify(userRepository, never()).existsByEmail(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void create_WhenEmailExists_ShouldThrowApiException() {
        when(userRepository.existsByUsername(testUser.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(testUser.getEmail())).thenReturn(true);
        
        ApiException exception = assertThrows(ApiException.class,
                () -> userService.create(testUser));

        assertEquals(HttpStatus.CONFLICT, exception.getStatus());
        assertEquals("Пользователь с таким email уже существует", exception.getMessage());
        verify(userRepository).existsByUsername(testUser.getUsername());
        verify(userRepository).existsByEmail(testUser.getEmail());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void create_WhenUserIsValid_ShouldSaveUserWithEncodedPassword() {
        String rawPassword = "plainPassword";
        String encodedPassword = "encodedPassword";

        testUser.setPassword(rawPassword);

        User savedUser = new User();
        savedUser.setId(1L);
        savedUser.setUsername(testUser.getUsername());
        savedUser.setEmail(testUser.getEmail());
        savedUser.setPassword(encodedPassword);
        savedUser.setActive(true);

        when(userRepository.existsByUsername(testUser.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(testUser.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(rawPassword)).thenReturn(encodedPassword);
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        
        User result = userService.create(testUser);
        
        assertNotNull(result);
        assertEquals(savedUser.getId(), result.getId());
        assertEquals(savedUser.getUsername(), result.getUsername());
        assertEquals(savedUser.getEmail(), result.getEmail());
        assertEquals(encodedPassword, result.getPassword());
        assertTrue(result.isActive());

        verify(userRepository).existsByUsername(testUser.getUsername());
        verify(userRepository).existsByEmail(testUser.getEmail());
        verify(passwordEncoder).encode(rawPassword);
        verify(userRepository).save(any(User.class));
    }

    @Test
    void findAll_ShouldReturnAllUsers() {
        List<User> expectedUsers = Arrays.asList(
                createUser(1L, "user1", "user1@test.com"),
                createUser(2L, "user2", "user2@test.com")
        );
        when(userRepository.findAll()).thenReturn(expectedUsers);
        
        List<User> result = userService.findAll();
        
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(expectedUsers, result);
        verify(userRepository).findAll();
    }

    @Test
    void findAll_WhenNoUsers_ShouldReturnEmptyList() {
        when(userRepository.findAll()).thenReturn(List.of());
        
        List<User> result = userService.findAll();
        
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(userRepository).findAll();
    }

    @Test
    void findById_WhenUserExists_ShouldReturnUser() {
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));
        
        User result = userService.findById(userId);
        
        assertNotNull(result);
        assertEquals(testUser.getId(), result.getId());
        assertEquals(testUser.getUsername(), result.getUsername());
        verify(userRepository).findById(userId);
    }

    @Test
    void findById_WhenUserNotExists_ShouldThrowIllegalArgumentException() {
        Long nonExistentId = 999L;
        when(userRepository.findById(nonExistentId)).thenReturn(Optional.empty());
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> userService.findById(nonExistentId));

        assertEquals("User not found", exception.getMessage());
        verify(userRepository).findById(nonExistentId);
    }

    @Test
    void findByUsername_WhenUserExists_ShouldReturnUser() {
        String username = "testuser";
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(testUser));
        
        User result = userService.findByUsername(username);
        
        assertNotNull(result);
        assertEquals(testUser.getUsername(), result.getUsername());
        verify(userRepository).findByUsername(username);
    }

    @Test
    void findByUsername_WhenUserNotExists_ShouldThrowIllegalArgumentException() {
        String nonExistentUsername = "nonexistent";
        when(userRepository.findByUsername(nonExistentUsername)).thenReturn(Optional.empty());
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> userService.findByUsername(nonExistentUsername));

        assertEquals("User not found", exception.getMessage());
        verify(userRepository).findByUsername(nonExistentUsername);
    }

    @Test
    void create_ShouldEncodePasswordBeforeSaving() {
        String rawPassword = "rawPassword123";
        String encodedPassword = "encodedPassword123";
        testUser.setPassword(rawPassword);

        when(userRepository.existsByUsername(testUser.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(testUser.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(rawPassword)).thenReturn(encodedPassword);

        User savedUser = new User();
        savedUser.setId(1L);
        savedUser.setUsername(testUser.getUsername());
        savedUser.setEmail(testUser.getEmail());
        savedUser.setPassword(encodedPassword);
        savedUser.setActive(true);

        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        
        User result = userService.create(testUser);
        
        assertEquals(encodedPassword, result.getPassword());
        verify(passwordEncoder).encode(rawPassword);
    }

    @Test
    void create_ShouldSetActiveToTrue() {
        User inactiveUser = new User();
        inactiveUser.setUsername("newuser");
        inactiveUser.setEmail("new@example.com");
        inactiveUser.setPassword("password");
        inactiveUser.setActive(false);

        when(userRepository.existsByUsername("newuser")).thenReturn(false);
        when(userRepository.existsByEmail("new@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");

        User savedUser = new User();
        savedUser.setId(2L);
        savedUser.setUsername("newuser");
        savedUser.setEmail("new@example.com");
        savedUser.setPassword("encodedPassword");
        savedUser.setActive(true);

        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        
        User result = userService.create(inactiveUser);
        
        assertTrue(result.isActive());
    }

    private User createUser(Long id, String username, String email) {
        User user = new User();
        user.setId(id);
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword("password");
        user.setActive(true);
        return user;
    }
}