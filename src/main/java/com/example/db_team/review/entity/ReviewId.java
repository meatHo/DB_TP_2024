package com.example.db_team.review.entity;

import com.example.db_team.user.domain.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class ReviewId implements Serializable {

    private User loginId;
    private String korName;
}
