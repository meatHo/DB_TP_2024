package com.example.db_team.review.controller;

import com.example.db_team.review.domain.Review;
import com.example.db_team.review.dto.WineReviewRequest;
import com.example.db_team.review.dto.WineReviewResponse;
import com.example.db_team.review.service.ReviewService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/me")
    public ResponseEntity<List<Review>> getMyReviews(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if(userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(List.of());
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(reviewService.getReviewsByUserId(userId));
    }

    @GetMapping("/{wineId}")
    public ResponseEntity<List<WineReviewResponse>> getReviewsByWineId(@PathVariable Long wineId) {
        List<WineReviewResponse> reviews = reviewService.getReviewsByWineId(wineId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/{wineId}")
    public WineReviewResponse createReview(@PathVariable Long wineId, @RequestBody WineReviewRequest request) {
        return reviewService.createReview(wineId, request);
    }
}
