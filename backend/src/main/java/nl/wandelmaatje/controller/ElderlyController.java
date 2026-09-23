package nl.wandelmaatje.controller;

import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import nl.wandelmaatje.dto.ElderlyRequest;
import nl.wandelmaatje.dto.ElderlyResponse;
import nl.wandelmaatje.exception.ResourceNotFoundException;
import nl.wandelmaatje.mapper.ElderlyMapper;
import nl.wandelmaatje.service.ElderlyService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController
@RequestMapping("/api/elderlies")
@Tag(name = "Elderly", description = "Operations for elderly people")
public class ElderlyController {

    private final ElderlyService elderlyService;

    // Injects the service layer responsible for elderly operations.
    public ElderlyController(ElderlyService elderlyService) {
        this.elderlyService = elderlyService;
    }

    // Returns the complete list of elderly persons.
    @GetMapping
    @Operation(summary = "List elderly people", description = "Returns a paginated and sorted list of elderly people")
    @ApiResponse(responseCode = "200", description = "Elderly people retrieved successfully")
    public Page<ElderlyResponse> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        return elderlyService.findAll(
                PageRequest.of(page, size, Sort.by(sortDirection, sortBy)))
                .map(ElderlyMapper::toResponse);
    }

    @GetMapping("/search")
    @Operation(summary = "Search elderly people by name")
    @ApiResponse(responseCode = "200", description = "Search results retrieved successfully")
    public List<ElderlyResponse> search(@RequestParam String name) {
        return elderlyService.searchByName(name).stream()
                .map(ElderlyMapper::toResponse)
                .toList();
    }

    // Fetches one elderly person by their identifier.
    @GetMapping("/{id}")
    @Operation(summary = "Get an elderly person by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Elderly person retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Elderly person not found")
    })
    public ElderlyResponse findById(@PathVariable Long id) {
        return elderlyService.findById(id)
                .map(ElderlyMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Elderly not found"));
    }

    // Creates a new elderly record from the request payload.
    @PostMapping
    @Operation(summary = "Create an elderly person")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Elderly person created successfully"),
            @ApiResponse(responseCode = "400", description = "Validation failed")
    })
    public ElderlyResponse create(@Valid @RequestBody ElderlyRequest request) {
        return ElderlyMapper.toResponse(
                elderlyService.save(ElderlyMapper.toEntity(request)));
    }

    // Deletes an elderly record by its identifier.
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an elderly person")
    @ApiResponse(responseCode = "200", description = "Elderly person deleted successfully")
    public void deleteById(@PathVariable Long id) {
        elderlyService.deleteById(id);
    }

    // Updates an existing elderly record by its identifier.
    @PutMapping("/{id}")
    @Operation(summary = "Update an elderly person")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Elderly person updated successfully"),
            @ApiResponse(responseCode = "400", description = "Validation failed"),
            @ApiResponse(responseCode = "404", description = "Elderly person not found")
    })
    public ElderlyResponse update(@PathVariable Long id, @Valid @RequestBody ElderlyRequest request) {
        return ElderlyMapper.toResponse(
                elderlyService.update(id, ElderlyMapper.toEntity(request)));
    }
}