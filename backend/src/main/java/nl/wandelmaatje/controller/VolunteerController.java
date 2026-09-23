package nl.wandelmaatje.controller;

import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import nl.wandelmaatje.dto.VolunteerRequest;
import nl.wandelmaatje.dto.VolunteerResponse;
import nl.wandelmaatje.mapper.VolunteerMapper;
import nl.wandelmaatje.service.VolunteerService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/volunteers")
@Tag(name = "Volunteer", description = "Operations for volunteers")
public class VolunteerController {

    private final VolunteerService volunteerService;

    /**
     * Constructs the controller with the required service dependency.
     */
    public VolunteerController(VolunteerService volunteerService) {
        this.volunteerService = volunteerService;
    }

    /**
     * Retrieves all volunteers.
     */
    @GetMapping
    @Operation(summary = "List volunteers", description = "Returns a paginated and sorted list of volunteers")
    @ApiResponse(responseCode = "200", description = "Volunteers retrieved successfully")
    public Page<VolunteerResponse> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        return volunteerService.findAll(
                PageRequest.of(page, size, Sort.by(sortDirection, sortBy)))
                .map(VolunteerMapper::toResponse);
    }

    @GetMapping("/search")
    @Operation(summary = "Search volunteers by name")
    @ApiResponse(responseCode = "200", description = "Search results retrieved successfully")
    public List<VolunteerResponse> search(@RequestParam String name) {
        return volunteerService.searchByName(name).stream()
                .map(VolunteerMapper::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a volunteer by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Volunteer retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Volunteer not found")
    })
    public VolunteerResponse findById(@PathVariable Long id) {
        return VolunteerMapper.toResponse(volunteerService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Create a volunteer")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Volunteer created successfully"),
            @ApiResponse(responseCode = "400", description = "Validation failed")
    })
    public VolunteerResponse create(@Valid @RequestBody VolunteerRequest request) {
        return VolunteerMapper.toResponse(
                volunteerService.save(VolunteerMapper.toEntity(request)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a volunteer")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Volunteer updated successfully"),
            @ApiResponse(responseCode = "400", description = "Validation failed"),
            @ApiResponse(responseCode = "404", description = "Volunteer not found")
    })
    public VolunteerResponse update(@PathVariable Long id, @Valid @RequestBody VolunteerRequest request) {
        return VolunteerMapper.toResponse(
                volunteerService.update(id, VolunteerMapper.toEntity(request)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a volunteer")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Volunteer deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Volunteer not found")
    })
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        volunteerService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
