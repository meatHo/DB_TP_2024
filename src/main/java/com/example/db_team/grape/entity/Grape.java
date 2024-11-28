package com.example.db_team.grape.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Grape {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long grapeId;
    @Column(name = "grape_name", unique = true, nullable = false)
    private String grapeName;
    @Column(name = "grape_ex")
    private String grapeEx;
}