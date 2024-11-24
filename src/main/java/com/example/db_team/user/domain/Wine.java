package com.example.db_team.user.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Wine {
    @Id
    private String kor_name;
    private String eng_name;
    private String acidity;
    private String sweetness;
    private String body;
    private String tanin;
    private String type;
    private String aroma;
    private int price;
    @ManyToOne
    @JoinColumn
    private Grape grape;
    @ManyToOne
    @JoinColumn
    private Country country;
    private String vintage;

}
