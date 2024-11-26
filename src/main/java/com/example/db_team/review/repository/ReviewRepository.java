package com.example.db_team.review.repository;

import com.example.db_team.review.entity.Review;
import com.example.db_team.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByUser(User user);
}