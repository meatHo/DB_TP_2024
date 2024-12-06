package com.example.db_team.review.domain;

import com.example.db_team.user.domain.User;
import com.example.db_team.wine.entity.Wine;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Check;

@Data
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "wine_id"})
})
//@Check(constraints = "date REGEXP '^\\d{4}-\\d{2}-\\d{2}$'")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private long reviewId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "wine_id")
    private Wine wine;

    @Column(name = "rating")
    private float rating;
    @Column(name = "comment")
    private String comment;
    @Column(name = "date")
    private String date;

    @Builder
    private Review(Long reviewId, User user, Wine wine, float rating, String comment, String date) {
        this.reviewId = reviewId;
        this.user = user;
        this.wine = wine;
        this.rating = rating;
        this.comment = comment;
        this.date = date;
    }
}
