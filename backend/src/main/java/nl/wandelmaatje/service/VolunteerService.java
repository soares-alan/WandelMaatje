package nl.wandelmaatje.service;

import java.util.List;

import nl.wandelmaatje.entity.Volunteer;
import nl.wandelmaatje.exception.ResourceNotFoundException;
import nl.wandelmaatje.repository.VolunteerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class VolunteerService {

    private final VolunteerRepository volunteerRepository;

    public VolunteerService(VolunteerRepository volunteerRepository) {
        this.volunteerRepository = volunteerRepository;
    }

    public Page<Volunteer> findAll(Pageable pageable) {
        return volunteerRepository.findAll(pageable);
    }

    public List<Volunteer> searchByName(String name) {
        return volunteerRepository.findByNameContainingIgnoreCase(name);
    }

    public Volunteer findById(Long id) {
        return volunteerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Volunteer not found"));
    }

    public Volunteer save(Volunteer volunteer) {
        return volunteerRepository.save(volunteer);
    }

    public Volunteer update(Long id, Volunteer volunteer) {

        Volunteer existingVolunteer = findById(id);
        existingVolunteer.setName(volunteer.getName());

        return volunteerRepository.save(existingVolunteer);
    }

    public void deleteById(Long id) {

        findById(id);

        volunteerRepository.deleteById(id);
    }
}