package com.example.db_team.user.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Grape {
    @Id
    private String grape;
    private String grapeEx;
}
