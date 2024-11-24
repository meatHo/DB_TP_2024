package com.example.db_team.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record UserLoginResponse(
        @Schema(description = "유저 ID", example = "1")
        Long userId) {
}
