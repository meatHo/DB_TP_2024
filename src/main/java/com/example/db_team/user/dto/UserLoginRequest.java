package com.example.db_team.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record UserLoginRequest(
        @Schema(description = "아이디", example = "testId")
        String loginId,

        @Schema(description = "비밀번호", example = "testPassword")
        String password) {
}

