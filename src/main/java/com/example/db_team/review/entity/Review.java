package com.example.db_team.review.entity;

import com.example.db_team.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ReviewId.class)
public class Review {
    @Id
    @ManyToOne
    @JoinColumn(name = "login_id", referencedColumnName = "login_id")
    private User loginId;
    @Id
    private String korName;
    private float rating;
    private String comment;
    private String date;
}
