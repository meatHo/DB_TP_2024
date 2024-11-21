package com.example.db_team.user.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private long id;
    private String loginId;
    private String userName;
    private String nickName;
    private String phoneNumber;
    private String password;

    @Builder
    private User(String loginId, String userName, String nickName, String phoneNumber, String password) {
        this.loginId = loginId;
        this.userName = userName;
        this.nickName = nickName;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }

}
