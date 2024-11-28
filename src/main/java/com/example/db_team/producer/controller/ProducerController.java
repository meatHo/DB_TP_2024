package com.example.db_team.producer.controller;

import com.example.db_team.producer.service.ProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ProducerController {

    private final ProducerService producerService;

    @PostMapping("/init-producers")
    public String initializeProducers() {

        producerService.initializeProducers();
        return "Producers initialized successfully!";
    }
}