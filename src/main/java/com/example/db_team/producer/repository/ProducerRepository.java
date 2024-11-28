package com.example.db_team.producer.repository;

import com.example.db_team.producer.entity.Producer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProducerRepository extends JpaRepository<Producer, Long> {

    Optional<Producer> findByRegion(String region);

    Optional<List<Producer>> findByOrigin(String Origin);
}
