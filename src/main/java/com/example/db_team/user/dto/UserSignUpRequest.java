package com.example.db_team.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record UserSignUpRequest(
        @Schema(description = "이름", example = "홍길동")
        String userName,

        @Schema(description = "전화번호", example = "010-1234-5678")
        String phoneNumber,

        @Schema(description = "이메일", example = "test@gmail.com")
        String email,

        @Schema(description = "아이디", example = "testId")
        String loginId,

        @Schema(description = "비밀번호", example = "testPassword")
        String password) {
}

