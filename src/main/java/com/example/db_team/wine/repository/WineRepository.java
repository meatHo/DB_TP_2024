package com.example.db_team.wine.repository;

import com.example.db_team.producer.entity.Producer;
import com.example.db_team.wine.entity.Wine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface WineRepository extends JpaRepository<Wine, Long>, JpaSpecificationExecutor<Wine> {

    Optional<List<Wine>> findByProducer(Producer producer);
}
