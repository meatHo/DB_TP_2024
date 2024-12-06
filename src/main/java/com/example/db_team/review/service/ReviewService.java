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

import java.time.LocalDate;
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
        // Request 내용 확인
        System.out.println("Received WineReviewRequest: " + request);

        // 개별 필드 출력
        System.out.println("Rating: " + request.rating());
        System.out.println("Comment: " + request.comment());

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
        System.out.println("2: " + request.comment());
        review = reviewRepository.save(review);
        System.out.println("3: " + request.comment());
        return WineReviewResponse.from(review);
    }


    private static Review getReview(WineReviewRequest request, User user, Wine wine) {
        // Log 확인용 출력
        System.out.println("asdfadsfasdf: " + request.rating());
        System.out.println("Comment: " + request.comment());

        // Review 생성
        Review review = Review.builder()
                .user(user)
                .wine(wine)
                .rating(request.rating())
                .comment(request.comment())
                .date(LocalDate.now()) // 요청의 date 대신 현재 날짜를 사용
                .build();
        System.out.println("1: " + request.comment());
        return review;
    }
}
