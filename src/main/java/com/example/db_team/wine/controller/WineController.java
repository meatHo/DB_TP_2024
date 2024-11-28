package com.example.db_team.wine.controller;

import com.example.db_team.wine.entity.Wine;
import com.example.db_team.wine.service.WineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wines")
public class WineController {

    private final WineService wineService;

    @GetMapping
    public ResponseEntity<List<Wine>> getWineList(@RequestParam Map<String, String> params) {

        List<Wine> wines = wineService.getWinesByParams(params);

        return ResponseEntity.status(HttpStatus.OK).body(wines);
    }

    @PostMapping("/init-wines")
    public String initializeWines() {

        wineService.initializeWines();
        return "Wines initialized successfully!";
    }
}
