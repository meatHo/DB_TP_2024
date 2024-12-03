package com.example.db_team.review.domain;

import com.example.db_team.user.domain.User;
import com.example.db_team.wine.entity.Wine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByUser(User user);

    List<Review> findByWine_WineId(Long wineId);

    boolean existsByUserAndWine(User user, Wine wine);
}