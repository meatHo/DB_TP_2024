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

        log.info(params.toString());

        Grape grape = grapeRepository.findByGrapeName(params.get("grapeName"))
                .orElse(null);

        List<Wine> wineList = new ArrayList<Wine>(wineRepository.findAll(
                Specification.where(WineSpecifications.hasQ(params.get("q")))
                        .and(WineSpecifications.hasType(params.get("type")))
                        .and(WineSpecifications.hasGrape(grape))
        )
        );

        log.info("wine 테이블 검색: {}", wineList.toString());

        producerRepository.findByRegion(params.get("region"))
                .flatMap(wineRepository::findByProducer)
                .ifPresent(wineList::retainAll);

        log.info("producer 테이블/지역 검색: {}", wineList.toString());

        producerRepository.findByOrigin(params.get("origin"))
                .filter(producers -> !producers.isEmpty())
                .ifPresent(producers -> {
                            log.info("빈문자열 producer가 존재함");
                            List<Wine> tempList = new ArrayList<>();
                            producers.forEach(producer -> {
                                        tempList.addAll(wineRepository.findByProducer(producer)
                                                .orElse(Collections.emptyList()));
                                        log.info("producer 테이블/나라 검색: {}", wineRepository.findByProducer(producer).toString());
                                        log.info(tempList.toString());
                                    }
                            );
                            wineList.retainAll(tempList);
                        }
                );

        log.info(producerRepository.findByOrigin(params.get("origin")).toString());

        log.info("와인 목록: {}", wineList.toString());

        return new ArrayList<>(wineList);
    }

    public Wine getWineByEngName(String engName) {

        return wineRepository.findByEngName(engName)
                .orElseThrow(() -> new RuntimeException("Wine not exist"));
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

    public Wine getWineById(Long wineId) {
        return wineRepository.findById(wineId)
                .orElseThrow(() -> new RuntimeException("Wine with ID [" + wineId + "] not exist"));
    }
}
