package nl.wandelmaatje.repository;

import nl.wandelmaatje.entity.Walk;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalkRepository
                extends JpaRepository<Walk, Long> {

        List<Walk> findByElderlyId(Long elderlyId);

        List<Walk> findByVolunteerId(Long volunteerId);
}