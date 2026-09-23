package nl.wandelmaatje.mapper;

import nl.wandelmaatje.dto.ElderlyRequest;
import nl.wandelmaatje.dto.ElderlyResponse;
import nl.wandelmaatje.entity.Elderly;

public final class ElderlyMapper {

    private ElderlyMapper() {
    }

    public static Elderly toEntity(ElderlyRequest request) {
        Elderly elderly = new Elderly();
        elderly.setName(request.name());
        elderly.setAge(request.age());
        elderly.setMobilityLevel(request.mobilityLevel());
        elderly.setNotes(request.notes());
        return elderly;
    }

    public static ElderlyResponse toResponse(Elderly elderly) {
        return new ElderlyResponse(
                elderly.getId(),
                elderly.getName(),
                elderly.getAge(),
                elderly.getMobilityLevel(),
                elderly.getNotes());
    }
}
