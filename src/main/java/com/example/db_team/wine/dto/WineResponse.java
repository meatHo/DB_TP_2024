package com.example.db_team.wine.dto;

import com.example.db_team.wine.entity.Wine;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class WineResponse {

    private Wine wine;
    private Double rating;
}
