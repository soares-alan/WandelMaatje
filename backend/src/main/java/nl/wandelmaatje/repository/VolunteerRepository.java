package nl.wandelmaatje.repository;

import nl.wandelmaatje.entity.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VolunteerRepository
                extends JpaRepository<Volunteer, Long> {

        List<Volunteer> findByNameContainingIgnoreCase(String name);
}