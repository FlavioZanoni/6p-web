package com.trab._bi.inventory.controller.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class RegisterResponse {
    private String title;
    private String description;
    private String token;
}
