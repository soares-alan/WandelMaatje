package nl.wandelmaatje.repository;

import nl.wandelmaatje.entity.Elderly;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ElderlyRepository
                extends JpaRepository<Elderly, Long> {

        List<Elderly> findByNameContainingIgnoreCase(String name);
}