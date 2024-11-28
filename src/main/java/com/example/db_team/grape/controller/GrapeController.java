package com.example.db_team.grape.controller;

import com.example.db_team.grape.entity.Grape;
import com.example.db_team.grape.service.GrapeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class GrapeController {

    private final GrapeService grapeService;

    @PostMapping("/init-grapes")
    public String initializeGrapes() {

        grapeService.initializeGrapes();
        return "Grapes initialized successfully!";
    }
}
