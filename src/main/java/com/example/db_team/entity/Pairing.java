package com.example.db_team.entity;

import com.example.db_team.wine.entity.Wine;
import jakarta.persistence.*;
import lombok.*;

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
