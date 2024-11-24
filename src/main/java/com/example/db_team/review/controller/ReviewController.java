package com.example.db_team.review.controller;

import com.example.db_team.review.entity.Review;
import com.example.db_team.review.service.ReviewService;
import com.example.db_team.user.domain.User;
import com.example.db_team.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/me")
    public ResponseEntity<List<Review>> me(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if(userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(List.of());
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(reviewService.findReviewsByUserId(userId));
    }
}
