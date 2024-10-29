package com.trab._bi.inventory.service;

import com.trab._bi.inventory.controller.dto.RegisterRequest;
import com.trab._bi.inventory.controller.dto.RegisterResponse;
import com.trab._bi.inventory.domain.Role;
import com.trab._bi.inventory.domain.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {
    private final PasswordEncoder passwordEncoder;
    private final SearchUserService searchUserService;
    private final PersistUserService persistUserService;

    public RegisterService(PasswordEncoder passwordEncoder, SearchUserService searchUserService, PersistUserService persistUserService) {
        this.passwordEncoder = passwordEncoder;
        this.searchUserService = searchUserService;
        this.persistUserService = persistUserService;
    }

    public RegisterResponse register(RegisterRequest registerRequest) {
        User user = searchUserService.findByEmail(registerRequest.getEmail());

        if (user != null) {
            throw new RuntimeException("User already exists");
        }

        user = buildUser(registerRequest);
        persistUserService.persist(user);

        return RegisterResponse.builder()
                .title("User registered successfully")
                .build();
    }

    private User buildUser(RegisterRequest registerRequest) {
        return User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .role(Role.ONLY)
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .build();
    }
}
