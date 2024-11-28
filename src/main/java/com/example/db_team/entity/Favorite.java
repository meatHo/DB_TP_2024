package com.example.db_team.entity;

import com.example.db_team.user.domain.User;
import com.example.db_team.wine.entity.Wine;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "favorite", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"login_id", "kor_name"})
})
public class Favorite {

    @Id
    @Column(name = "favorite_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long favoriteId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "wine_id")
    private Wine wine;


}
