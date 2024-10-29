package com.trab._bi.inventory.controller.dto;

import lombok.Getter;


public record AuthenticationRequest(String login, String password) {
    public AuthenticationRequest {
    }
}
