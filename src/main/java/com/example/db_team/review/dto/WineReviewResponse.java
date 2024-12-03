package com.example.db_team.review.dto;

import com.example.db_team.review.domain.Review;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record WineReviewResponse(
        @Schema(description = "리뷰 아이디", example = "testId")
        Long reviewId,

        @Schema(description = "사용자 아이디", example = "1")
        Long userId,

        @Schema(description = "사용자 이름", example = "홍길동")
        String userName,

        @Schema(description = "와인 아이디", example = "1234")
        Long wineId,

        @Schema(description = "와인 이름", example = "1987년산...")
        String wineName,

        @Schema(description = "평점", example = "5.0")
        float rating,

        @Schema(description = "리뷰 내용", example = "잘했어요!")
        String comment,

        @Schema(description = "리뷰 작성 날짜", example = "2024-05-20")
        String date
) {

        public static WineReviewResponse from(Review review) {
                return WineReviewResponse.builder()
                        .reviewId(review.getReviewId())
                        .userId(review.getUser().getUserId())
                        .userName(review.getUser().getUserName())
                        .wineId(review.getWine().getWineId())
                        .wineName(review.getWine().getKorName())
                        .rating(review.getRating())
                        .comment(review.getComment())
                        .date(review.getDate())
                        .build();
        }
}
