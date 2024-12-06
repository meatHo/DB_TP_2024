package com.example.db_team.wine.controller;

import com.example.db_team.review.domain.ReviewRepository;
import com.example.db_team.wine.dto.WineResponse;
import com.example.db_team.wine.entity.Wine;
import com.example.db_team.wine.service.WineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wines")
public class WineController {

    private final WineService wineService;

    private final ReviewRepository reviewRepository;

    @GetMapping
    public ResponseEntity<List<Wine>> getWineList(@RequestParam Map<String, String> params) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(wineService.getWinesByParams(params));
    }

    @GetMapping("/{engName}")
    public ResponseEntity<WineResponse> getWine(@PathVariable("engName") String engName) {
        try {
            // URL 디코딩 처리
            String decodedEngName = URLDecoder.decode(engName, StandardCharsets.UTF_8.name());
            // System.out.println("Decoded engName: " + decodedEngName);

            // 서비스에서 와인 데이터 가져오기
            Wine wine = wineService.getWineByEngName(decodedEngName);
            if (wine == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            else {
                Double rating = reviewRepository.findAverageRating(wine.getWineId());
                Double average = Double.valueOf(String.format("%.2f", rating));
                WineResponse response = new WineResponse(wine, average);

                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/id/{wineId}")
    public ResponseEntity<Wine> getWineById(@PathVariable("wineId") Long wineId) {
        try {
            System.out.println("Received wineId: " + wineId); // 디버깅용 로그

            // 서비스에서 와인 데이터 가져오기
            Wine wine = wineService.getWineById(wineId);
            if (wine == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            return ResponseEntity.status(HttpStatus.OK).body(wine);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
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
