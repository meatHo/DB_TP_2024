package com.example.db_team.user.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private long userId;
    @Column(name = "login_id", unique = true, nullable = false)
    private String loginId;
    private String userName;
    private String email;
    private String phoneNumber;
    private String password;

    public User(Long userId) {
        this.userId = userId;
    }
}
