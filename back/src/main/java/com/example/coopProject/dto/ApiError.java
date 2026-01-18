package com.example.coopProject.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ApiError {
    LocalDateTime timestamp;
    int status;
    String error;
    String message;
    String path;
}
