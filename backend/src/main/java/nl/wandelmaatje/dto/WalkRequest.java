package nl.wandelmaatje.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public record WalkRequest(
        @NotNull Long elderlyId,
        @NotNull Long volunteerId,
        @NotNull LocalDate walkDate,
        @NotNull @Positive Integer durationMinutes,
        @NotNull @Positive Double distanceKm,
        @NotNull @Min(1) @Max(5) Integer painMood,
        String notes) {
}
