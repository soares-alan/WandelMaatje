package nl.wandelmaatje.service;

import java.util.List;

import nl.wandelmaatje.entity.Elderly;
import nl.wandelmaatje.entity.Volunteer;
import nl.wandelmaatje.entity.Walk;
import nl.wandelmaatje.exception.ResourceNotFoundException;
import nl.wandelmaatje.repository.ElderlyRepository;
import nl.wandelmaatje.repository.VolunteerRepository;
import nl.wandelmaatje.repository.WalkRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class WalkService {

    private final WalkRepository walkRepository;
    private final ElderlyRepository elderlyRepository;
    private final VolunteerRepository volunteerRepository;

    public WalkService(
            WalkRepository walkRepository,
            ElderlyRepository elderlyRepository,
            VolunteerRepository volunteerRepository) {

        this.walkRepository = walkRepository;
        this.elderlyRepository = elderlyRepository;
        this.volunteerRepository = volunteerRepository;
    }

    public Page<Walk> findAll(Pageable pageable) {
        return walkRepository.findAll(pageable);
    }

    public List<Walk> searchByElderlyId(Long elderlyId) {
        return walkRepository.findByElderlyId(elderlyId);
    }

    public List<Walk> searchByVolunteerId(Long volunteerId) {
        return walkRepository.findByVolunteerId(volunteerId);
    }

    public Walk findById(Long id) {
        return walkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Walk not found"));
    }

    public Walk save(Walk walk) {

        Elderly elderly = elderlyRepository.findById(walk.getElderly().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Elderly not found"));

        Volunteer volunteer = volunteerRepository.findById(walk.getVolunteer().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Volunteer not found"));

        walk.setElderly(elderly);
        walk.setVolunteer(volunteer);

        return walkRepository.save(walk);
    }

    public Walk update(Long id, Walk walk) {

        findById(id);

        Elderly elderly = elderlyRepository.findById(walk.getElderly().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Elderly not found"));

        Volunteer volunteer = volunteerRepository.findById(walk.getVolunteer().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Volunteer not found"));

        walk.setElderly(elderly);
        walk.setVolunteer(volunteer);
        walk.setId(id);

        return walkRepository.save(walk);
    }

    public void deleteById(Long id) {

        findById(id);

        walkRepository.deleteById(id);
    }
}