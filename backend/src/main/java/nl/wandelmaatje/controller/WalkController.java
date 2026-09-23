package nl.wandelmaatje.controller;

import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import nl.wandelmaatje.dto.WalkRequest;
import nl.wandelmaatje.dto.WalkResponse;
import nl.wandelmaatje.mapper.WalkMapper;
import nl.wandelmaatje.service.WalkService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/walks")
@Tag(name = "Walk", description = "Operations for walks")
public class WalkController {

    private final WalkService walkService;

    /**
     * Constructs the controller with the required service dependency.
     */
    public WalkController(WalkService walkService) {
        this.walkService = walkService;
    }

    /**
     * Retrieves all walks.
     */
    @GetMapping
    @Operation(summary = "List walks", description = "Returns a paginated and sorted list of walks")
    @ApiResponse(responseCode = "200", description = "Walks retrieved successfully")
    public Page<WalkResponse> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        String sortProperty = "date".equals(sortBy) ? "walkDate" : sortBy;
        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        return walkService.findAll(
                PageRequest.of(page, size, Sort.by(sortDirection, sortProperty)))
                .map(WalkMapper::toResponse);
    }

    @GetMapping("/search/elderly")
    @Operation(summary = "Search walks by elderly ID")
    @ApiResponse(responseCode = "200", description = "Search results retrieved successfully")
    public List<WalkResponse> searchByElderly(@RequestParam Long elderlyId) {
        return walkService.searchByElderlyId(elderlyId).stream()
                .map(WalkMapper::toResponse)
                .toList();
    }

    @GetMapping("/search/volunteer")
    @Operation(summary = "Search walks by volunteer ID")
    @ApiResponse(responseCode = "200", description = "Search results retrieved successfully")
    public List<WalkResponse> searchByVolunteer(@RequestParam Long volunteerId) {
        return walkService.searchByVolunteerId(volunteerId).stream()
                .map(WalkMapper::toResponse)
                .toList();
    }

    /**
     * Retrieves a walk by its ID.
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get a walk by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Walk retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Walk not found")
    })
    public WalkResponse findById(@PathVariable Long id) {
        return WalkMapper.toResponse(walkService.findById(id));
    }

    /**
     * Creates a new walk.
     */
    @PostMapping
    @Operation(summary = "Create a walk")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Walk created successfully"),
            @ApiResponse(responseCode = "400", description = "Validation failed"),
            @ApiResponse(responseCode = "404", description = "Related elderly person or volunteer not found")
    })
    public WalkResponse save(@Valid @RequestBody WalkRequest request) {
        return WalkMapper.toResponse(
                walkService.save(WalkMapper.toEntity(request)));
    }

    /**
     * Updates an existing walk.
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update a walk")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Walk updated successfully"),
            @ApiResponse(responseCode = "400", description = "Validation failed"),
            @ApiResponse(responseCode = "404", description = "Walk or related resource not found")
    })
    public WalkResponse update(
            @PathVariable Long id,
            @Valid @RequestBody WalkRequest request) {

        return WalkMapper.toResponse(
                walkService.update(id, WalkMapper.toEntity(request)));
    }

    /**
     * Deletes a walk by its ID.
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a walk")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Walk deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Walk not found")
    })
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {

        walkService.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}