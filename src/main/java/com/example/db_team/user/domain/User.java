package com.example.db_team.user.domain;

import com.example.db_team.entity.Favorite;
import com.example.db_team.entity.Pairing;
import com.example.db_team.review.entity.Review;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userId;
    @Column(name = "login_id", unique = true, nullable = false)
    private String loginId;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "email", unique = true, nullable = false)
    private String email;
    @Column(name = "phone_number", unique = true, nullable = false)
    private String phoneNumber;
    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Favorite> favorites;

    public User(Long userId) {
        this.userId = userId;
    }
}
