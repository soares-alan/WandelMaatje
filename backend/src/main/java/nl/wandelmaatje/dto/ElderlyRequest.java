package nl.wandelmaatje.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import nl.wandelmaatje.enums.MobilityLevel;

public record ElderlyRequest(
        @NotBlank String name,
        @NotNull @Positive Integer age,
        @NotNull MobilityLevel mobilityLevel,
        String notes) {
}
