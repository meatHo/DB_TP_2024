package com.example.db_team.wine.repository;

import com.example.db_team.grape.entity.Grape;
import com.example.db_team.wine.entity.Wine;
import org.springframework.data.jpa.domain.Specification;

public class WineSpecifications {

    public static Specification<Wine> hasQ(String q) {
        return (root, query, cb) -> (q == null || q.isEmpty())
                ? null : cb.like(root.get("engName"), "%" + q.toLowerCase() + "%");
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
