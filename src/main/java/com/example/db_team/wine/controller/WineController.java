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

        return ResponseEntity.status(HttpStatus.OK)
                .body(wineService.getWinesByParams(params));
    }

    @GetMapping("/{wineName}")
    public ResponseEntity<Wine> getWine(@PathVariable String engName) {

        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(wineService.getWineByEngName(engName));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }

    }

    @PostMapping("/init-wines")
    public String initializeWines() {

        try {
            wineService.initializeWines();
            return "Wines initialized successfully!";
        } catch (Exception e) {
            return "Wines could not be initialized!";
        }

    }
}
