package com.trab._bi.inventory.service;

import com.trab._bi.inventory.controller.dto.AuthenticationRequest;
import com.trab._bi.inventory.controller.dto.AuthenticationResponse;
import com.trab._bi.inventory.domain.User;
import com.trab._bi.inventory.domain.UserDetailsImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final SearchUserService searchUserUseCase;
    private final TokenService tokenService;

    public AuthenticationService(AuthenticationManager authenticationManager, SearchUserService searchUserUseCase,
                                 TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.searchUserUseCase = searchUserUseCase;
        this.tokenService = tokenService;
    }

    @Transactional
    public AuthenticationResponse authenticate(AuthenticationRequest authRequest) {
        String email = authRequest.login();
        String password = authRequest.password();

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken
                (email.trim(), password.trim()));

        User user = searchUserUseCase.findByEmail(email);

        String jwtToken = tokenService.generateToken(new UserDetailsImpl(user));
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .expiration(tokenService.getTokenExpiration(jwtToken))
                .type("Bearer Token")
                .build();
    }
}
