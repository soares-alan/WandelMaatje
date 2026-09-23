package nl.wandelmaatje.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import nl.wandelmaatje.entity.Elderly;
import nl.wandelmaatje.exception.ResourceNotFoundException;
import nl.wandelmaatje.repository.ElderlyRepository;

@Service
public class ElderlyService {

    private final ElderlyRepository elderlyRepository;

    public ElderlyService(ElderlyRepository elderlyRepository) {
        this.elderlyRepository = elderlyRepository;
    }

    // Retrieves all elderly records.
    public Page<Elderly> findAll(Pageable pageable) {
        return elderlyRepository.findAll(pageable);
    }

    public List<Elderly> searchByName(String name) {
        return elderlyRepository.findByNameContainingIgnoreCase(name);
    }

    // Retrieves an elderly record by its identifier.
    public Optional<Elderly> findById(Long id) {
        return elderlyRepository.findById(id);
    }

    // Persists a new or updated elderly record.
    public Elderly save(Elderly elderly) {
        return elderlyRepository.save(elderly);
    }

    // Deletes an elderly record by its identifier.
    public void deleteById(Long id) {
        if (!elderlyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Elderly not found");
        }
        elderlyRepository.deleteById(id);
    }

    // Updates an existing elderly record.
    public Elderly update(Long id, Elderly elderly) {

        Elderly existingElderly = elderlyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Elderly not found"));

        existingElderly.setName(elderly.getName());
        existingElderly.setAge(elderly.getAge());
        existingElderly.setMobilityLevel(elderly.getMobilityLevel());
        existingElderly.setNotes(elderly.getNotes());

        return elderlyRepository.save(existingElderly);
    }
}