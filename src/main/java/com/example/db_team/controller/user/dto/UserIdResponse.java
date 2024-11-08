package com.example.db_team.controller.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record UserIdResponse(
        @Schema(description = "사용자 식별 ID", example = "1")
        Long userId
) {
}
