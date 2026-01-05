package com.example.coopProject;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CoopProjectApplication {

	public static void main(String[] args) {
		// Загрузка .env файл до инициализации Spring Boot
		// Это необходимо, чтобы переменные были доступны при чтении application.properties
		Dotenv dotenv = Dotenv.configure()
				.directory("./")
				.ignoreIfMissing()
				.load();

		// Установка переменных из .env в System Properties
		// Spring Boot автоматически читает их через ${VAR_NAME} в application.properties
		dotenv.entries().forEach(entry -> {
			String key = entry.getKey();
			String value = entry.getValue();
			// Установка только если переменная еще не установлена в системе
			if (System.getProperty(key) == null && System.getenv(key) == null) {
				System.setProperty(key, value);
			}
		});

		SpringApplication.run(CoopProjectApplication.class, args);
	}
	
}
