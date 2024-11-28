package com.example.db_team.producer.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Producer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long producerId;
    @Column(name = "region", unique = true, nullable = false)
    private String region;
    @Column(name = "origin")
    private String origin;
    @Column(name = "region_ex")
    private String regionEx;
}
