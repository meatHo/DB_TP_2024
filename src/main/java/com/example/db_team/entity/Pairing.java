package com.example.db_team.entity;

import com.example.db_team.review.entity.Review;
import com.example.db_team.wine.entity.Wine;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "pairing", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"wine_name", "food"})
})
public class Pairing {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long pairingId;
    @ManyToOne
    @JoinColumn(name = "wine_name")
    private Wine wine;
    @Column(name = "food")
    private String food;
}
