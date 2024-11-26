package com.example.db_team.wine.entity;

import com.example.db_team.entity.Favorite;
import com.example.db_team.entity.Grape;
import com.example.db_team.entity.Pairing;
import com.example.db_team.entity.Producer;
import com.example.db_team.review.entity.Review;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Wine {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "wine_id")
    private long wineId;
    @Column(name = "kor_name", unique = true, nullable = false)
    private String korName;
    @Column(name = "eng_name", unique = true, nullable = false)
    private String engName;
    @Column(name = "acidity")
    private String acidity;
    @Column(name = "sweetness")
    private String sweetness;
    @Column(name = "body")
    private String body;
    @Column(name = "tanin")
    private String tanin;
    @Column(name = "type")
    private String type;
    @Column(name = "aroma")
    private String aroma;
    @Column(name = "price")
    private int price;
    @ManyToOne
    @JoinColumn(name = "grape_id")
    private Grape grape;
    @ManyToOne
    @JoinColumn(name = "country")
    private Producer producer;
    @Column(name = "vintage")
    private String vintage;

    @OneToMany(mappedBy = "wine", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;
    @OneToMany(mappedBy = "wine", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Favorite> favorites;
    @OneToMany(mappedBy = "wine", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pairing> pairings;
}
