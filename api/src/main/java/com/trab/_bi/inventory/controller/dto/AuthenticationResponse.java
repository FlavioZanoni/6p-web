package com.trab._bi.inventory.controller.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
public class AuthenticationResponse {
    private String token;
    private String type;
    private Date expiration;
}
