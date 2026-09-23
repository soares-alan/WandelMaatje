package nl.wandelmaatje.dto;

import java.time.LocalDate;

public record WalkResponse(
        Long id,
        ElderlyResponse elderly,
        VolunteerResponse volunteer,
        LocalDate walkDate,
        Integer durationMinutes,
        Double distanceKm,
        Integer painMood,
        String notes) {
}
