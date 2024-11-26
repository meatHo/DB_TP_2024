package com.example.db_team.entity;

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
public class Grape {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long grapeId;
    @Column(name = "grape_name")
    private String grapeName;
    @Column(name = "grape_ex")
    private String grapeEx;

    @OneToMany(mappedBy = "grape", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Wine> wines;
}
