package nl.wandelmaatje.dto;

import jakarta.validation.constraints.NotBlank;

public record VolunteerRequest(@NotBlank String name) {
}
