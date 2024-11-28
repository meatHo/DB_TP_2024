package com.example.db_team.wine.service;

import com.example.db_team.grape.entity.Grape;
import com.example.db_team.grape.repository.GrapeRepository;
import com.example.db_team.producer.repository.ProducerRepository;
import com.example.db_team.producer.entity.Producer;
import com.example.db_team.wine.entity.Wine;
import com.example.db_team.wine.repository.WineRepository;
import com.example.db_team.wine.repository.WineSpecifications;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class WineService {

    private final WineRepository wineRepository;
    private final GrapeRepository grapeRepository;
    private final ProducerRepository producerRepository;

    public List<Wine> getWinesByParams(Map<String, String> params) {

        log.debug(params.toString());

        Grape grape = grapeRepository.findByGrapeName(params.get("grapeName"))
                        .orElse(null);

        List<Wine> wineList = new ArrayList<Wine>(wineRepository.findAll(
                Specification.where(WineSpecifications.hasSearchTerm(params.get("searchTerm")))
                        .and(WineSpecifications.hasType(params.get("type")))
                        .and(WineSpecifications.hasGrape(grape))
            )
        );

        log.info(wineList.toString());

        producerRepository.findByRegion(params.get("region"))
                .flatMap(wineRepository::findByProducer)
                .ifPresent(wineList::retainAll);

        log.info(producerRepository.findByRegion(params.get("region"))
                .flatMap(wineRepository::findByProducer).toString());

        log.info(wineList.toString());

        producerRepository.findByOrigin(params.get("origin"))
            .ifPresent(producers -> {
                        List<Wine> tempList = new ArrayList<>();
                        producers.forEach(producer -> {
                                tempList.addAll(wineRepository.findByProducer(producer)
                                                    .orElse(Collections.emptyList()));
                                log.info(wineRepository.findByProducer(producer).toString());
                                log.info(tempList.toString());
                            }
                        );
                        wineList.retainAll(tempList);
                    }
            );

        log.info(producerRepository.findByOrigin(params.get("origin")).toString());

        log.info(wineList.toString());

        return new ArrayList<>(wineList);
    }

    public void initializeWines() {

        List<Wine> wines = new ArrayList<>();

        Grape grape = grapeRepository.findByGrapeName("Cabernet Sauvignon")
                .orElseThrow(() -> new RuntimeException("Grape not exist"));

        Producer producer = producerRepository.findByRegion("Napa Valley")
                .orElseThrow(() -> new RuntimeException("Grape not exist"));

        wines.add(Wine.builder().wineId(0L).korName("오퍼스 원").engName("Opus One").acidity("중간").sweetness("낮음").body("풀").tanin("높음").type("Red").aroma("검은 과일, 스파이스").price(400000).grape(grape).producer(producer).vintage("2020").build());

        wineRepository.saveAll(wines);
    }
}
