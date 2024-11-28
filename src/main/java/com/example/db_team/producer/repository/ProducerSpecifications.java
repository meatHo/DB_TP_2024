package com.example.db_team.producer.repository;

import com.example.db_team.producer.entity.Producer;
import org.springframework.data.jpa.domain.Specification;

public class ProducerSpecifications {

    public static Specification<Producer> hasRegion(String region) {
        return (root, query, criteriaBuilder) ->
                (region == null || region.isEmpty())
                        ? null : criteriaBuilder.equal(root.get("region"), region);
    }
    public static Specification<Producer> hasOrigin(String origin) {
        return (root, query, criteriaBuilder) ->
                (origin == null || origin.isEmpty())
                        ? null : criteriaBuilder.equal(root.get("origin"), origin);
    }
}
