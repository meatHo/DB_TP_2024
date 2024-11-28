package com.example.db_team.producer.service;

import com.example.db_team.producer.entity.Producer;
import com.example.db_team.producer.repository.ProducerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProducerService {

    private final ProducerRepository producerRepository;

    @Transactional
    public void initializeProducers() {

        Map<String, String[]> regionsByCountry = new HashMap<>();
        regionsByCountry.put("France", new String[]{"Bordeaux", "Burgundy", "Champagne", "Loire Valley", "Rhône Valley"});
        regionsByCountry.put("Italy", new String[]{"Tuscany", "Piedmont", "Veneto", "Sicily"});
        regionsByCountry.put("Spain", new String[]{"Rioja", "Priorat", "Ribera del Duero", "Rías Baixas"});
        regionsByCountry.put("Portugal", new String[]{"Douro", "Alentejo", "Dão"});
        regionsByCountry.put("Germany", new String[]{"Mosel", "Rheingau", "Pfalz"});
        regionsByCountry.put("US", new String[]{"Napa Valley", "Sonoma", "Willamette Valley"});
        regionsByCountry.put("New Zealand", new String[]{"Marlborough", "Hawke's Bay"});
        regionsByCountry.put("Australia", new String[]{"Barossa Valley", "Yarra Valley"});
        regionsByCountry.put("Chile", new String[]{"Maipo Valley", "Colchagua Valley"});
        regionsByCountry.put("Argentina", new String[]{"Mendoza", "Salta"});

        regionsByCountry.forEach((country, regions) -> {
            for (String region : regions) {
                Producer producer = Producer.builder()
                        .origin(country)
                        .region(region)
                        .regionEx("Description for " + region) // 필요한 경우 설명 추가
                        .build();
                producerRepository.save(producer);
            }
        });
    }
}