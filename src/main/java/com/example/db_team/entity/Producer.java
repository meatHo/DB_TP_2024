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
@Table(name = "producer", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"country", "region"})
})
public class Producer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long producerId;
    @Column(name = "country")
    private String country;
    @Column(name = "region")
    private String region;
    @Column(name = "region_ex")
    private String regionEx;

    @OneToMany(mappedBy = "producer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Wine> wines;
}
