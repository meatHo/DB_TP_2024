package com.example.db_team.controller.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record UserUpdateRequest(
        @Schema(description = "사용자 이메일", example = "juan@naver.com")
        String email
) {
}
