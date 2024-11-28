package com.example.db_team.grape.repository;

import com.example.db_team.grape.entity.Grape;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface GrapeRepository extends JpaRepository<Grape, Long> {

    Optional<Grape> findByGrapeName(String grapeName);
}
