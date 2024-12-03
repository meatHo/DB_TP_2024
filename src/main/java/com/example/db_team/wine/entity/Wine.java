package com.example.db_team.wine.entity;

import com.example.db_team.grape.entity.Grape;
import com.example.db_team.producer.entity.Producer;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Check;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Check(constraints = "acidity IN ('Low', 'Medium', 'High')")
@Check(constraints = "sweetness IN ('Low', 'Medium', 'High')")
@Check(constraints = "body IN ('Light', 'Medium', 'Full')")
@Check(constraints = "tanin IN ('Low', 'Medium', 'High')")
@Check(constraints = "type IN ('Sparkling', 'Red', 'White')")
@Check(constraints = "aroma IN ('Herbal', 'Nutty', 'Woody', 'Spicy', 'Floral', 'Fruity')")
@Check(constraints = "price >= 0 AND price <= 500000")
@Check(constraints = "vintage >= '0000' AND vintage <= '9999'")
public class Wine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wine_id")
    private long wineId;
    @Column(name = "kor_name")
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
    @Column(name = "type") // Sparkling, Red, White
    private String type;
    @Column(name = "aroma")
    private String aroma;
    @Column(name = "price")
    private int price;
    @Column(name = "alcohol_content")
    private int alcoholContent;

    @ManyToOne
    @JoinColumn(name = "grape_id")
    private Grape grape;

    @ManyToOne
    @JoinColumn(name = "producer_id")
    private Producer producer;

    @Column(name = "vintage")
    private String vintage;

}
