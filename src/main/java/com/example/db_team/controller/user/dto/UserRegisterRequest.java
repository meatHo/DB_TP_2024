package com.example.db_team.controller.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record UserRegisterRequest(
        @Schema(description = "사용자 성", example = "Juan")
        String firstName,

        @Schema(description = "사용자 이름", example = "Vega")
        String lastName,

        @Schema(description = "사용자 이메일", example = "juan@naver.com")
        String email
) {
}
