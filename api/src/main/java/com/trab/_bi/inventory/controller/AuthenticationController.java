package com.trab._bi.inventory.controller;

import com.trab._bi.inventory.controller.dto.AuthenticationRequest;
import com.trab._bi.inventory.controller.dto.AuthenticationResponse;
import com.trab._bi.inventory.controller.dto.RegisterRequest;
import com.trab._bi.inventory.controller.dto.RegisterResponse;
import com.trab._bi.inventory.service.AuthenticationFlowService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final AuthenticationFlowService authenticationFlowService;

    public AuthenticationController(AuthenticationFlowService authenticationFlowService) {
        this.authenticationFlowService = authenticationFlowService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authRequest) {
        return new ResponseEntity<>(authenticationFlowService.authenticate(authRequest), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest) {
        return new ResponseEntity<>(authenticationFlowService.register(registerRequest), HttpStatus.CREATED);
    }

}
