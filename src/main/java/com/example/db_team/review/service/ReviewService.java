package com.example.db_team.review.service;

import com.example.db_team.review.domain.Review;
import com.example.db_team.review.domain.ReviewRepository;
import com.example.db_team.user.domain.User;
import com.example.db_team.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public List<Review> getReviewsByUserId(long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        return reviewRepository.findByUser(user);
    }
}
