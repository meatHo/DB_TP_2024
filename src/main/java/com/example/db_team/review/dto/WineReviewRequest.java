package com.example.db_team.review.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

public record WineReviewRequest(
        @Schema(description = "사용자 아이디", example = "testId")
        Long userId,

        @Schema(description = "와인 아이디", example = "testId")
        Long wineId,

        @Schema(description = "평점", example = "5.0")
        float rating,

        @Schema(description = "리뷰 내용", example = "잘했어요!")
        String comment,

        @Schema(description = "리뷰 작성 날짜", example = "2024-05-20")
        LocalDate date
) {
}
