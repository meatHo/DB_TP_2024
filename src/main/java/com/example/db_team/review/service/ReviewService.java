package com.example.db_team.review.service;

import com.example.db_team.review.domain.Review;
import com.example.db_team.review.domain.ReviewRepository;
import com.example.db_team.review.dto.WineReviewRequest;
import com.example.db_team.review.dto.WineReviewResponse;
import com.example.db_team.user.domain.User;
import com.example.db_team.user.domain.UserRepository;
import com.example.db_team.wine.entity.Wine;
import com.example.db_team.wine.repository.WineRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final WineRepository wineRepository;

    public List<Review> getReviewsByUserId(long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        return reviewRepository.findByUser(user);
    }

    public List<WineReviewResponse> getReviewsByWineId(Long wineId) {
        List<Review> reviews = reviewRepository.findByWine_WineId(wineId);
        List<WineReviewResponse> responseList = new ArrayList<>();

        for (Review review : reviews) {
            responseList.add(WineReviewResponse.from(review));
        }
        return responseList;
    }

    public WineReviewResponse createReview(Long wineId, WineReviewRequest request, HttpSession session) {
        Object userIdFromSession = session.getAttribute("userId");
        System.out.println("Session userId: " + userIdFromSession);

        if (userIdFromSession == null) {
            throw new IllegalStateException("User is not logged in.");
        }

        Long userId = (Long) userIdFromSession;

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        Wine wine = wineRepository.findById(wineId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid wine ID"));

        if (reviewRepository.existsByUserAndWine(user, wine)) {
            throw new IllegalStateException("Review already exists!");
        }

        Review review = getReview(request, user, wine);
        review = reviewRepository.save(review);
        return WineReviewResponse.from(review);
    }


    private static Review getReview(WineReviewRequest request, User user, Wine wine) {
        Review review = Review.builder()
                .user(user)
                .wine(wine)
                .rating(request.rating())
                .comment(request.comment())
                .date(request.date())
                .build();
        return review;
    }
}
