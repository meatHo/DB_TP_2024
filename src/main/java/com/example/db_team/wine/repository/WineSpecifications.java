package com.example.db_team.wine.repository;

import com.example.db_team.grape.entity.Grape;
import com.example.db_team.wine.entity.Wine;
import org.springframework.data.jpa.domain.Specification;

public class WineSpecifications {

    public static Specification<Wine> hasQ(String q) {
        return (root, query, cb) -> {
            if (q == null || q.isEmpty()) {
                return null;
            } else if (q.matches(".*[a-zA-Z]+.*")) {
                return cb.like(root.get("engName"), "%" + q.toLowerCase() + "%");
            } else {
                return cb.like(root.get("korName"), "%" + q + "%");
            }
        };
    }

    public static Specification<Wine> hasType(String type) {
        return (root, query, cb) -> (type == null || type.isEmpty())
                ? null : cb.equal(root.get("type"), type);
    }

    public static Specification<Wine> hasGrape(Grape grape) {
        return (root, query, cb) -> (grape == null)
                ? null : cb.equal(root.get("grape"), grape);
    }
}
