package com.trab._bi.inventory.service;

import com.trab._bi.inventory.controller.dto.AuthenticationRequest;
import com.trab._bi.inventory.controller.dto.AuthenticationResponse;
import com.trab._bi.inventory.controller.dto.RegisterRequest;
import com.trab._bi.inventory.controller.dto.RegisterResponse;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationFlowService {
    private final RegisterService registerService;
    private final AuthenticationService authenticationService;

    public AuthenticationFlowService(RegisterService registerService, AuthenticationService authenticationService) {
        this.registerService = registerService;
        this.authenticationService = authenticationService;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authRequest) {
        return authenticationService.authenticate(authRequest);
    }

    public RegisterResponse register(RegisterRequest registerRequest) {
        return registerService.register(registerRequest);
    }
}
