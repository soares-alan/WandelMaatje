package nl.wandelmaatje.dto;

import nl.wandelmaatje.enums.MobilityLevel;

public record ElderlyResponse(
        Long id,
        String name,
        Integer age,
        MobilityLevel mobilityLevel,
        String notes) {
}
