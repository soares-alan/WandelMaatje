package nl.wandelmaatje.mapper;

import nl.wandelmaatje.dto.WalkRequest;
import nl.wandelmaatje.dto.WalkResponse;
import nl.wandelmaatje.entity.Elderly;
import nl.wandelmaatje.entity.Volunteer;
import nl.wandelmaatje.entity.Walk;

public final class WalkMapper {

    private WalkMapper() {
    }

    // Builds association stubs carrying only the ID, resolved and validated by
    // WalkService.
    public static Walk toEntity(WalkRequest request) {
        Elderly elderly = new Elderly();
        elderly.setId(request.elderlyId());

        Volunteer volunteer = new Volunteer();
        volunteer.setId(request.volunteerId());

        Walk walk = new Walk();
        walk.setElderly(elderly);
        walk.setVolunteer(volunteer);
        walk.setWalkDate(request.walkDate());
        walk.setDurationMinutes(request.durationMinutes());
        walk.setDistanceKm(request.distanceKm());
        walk.setPainMood(request.painMood());
        walk.setNotes(request.notes());
        return walk;
    }

    public static WalkResponse toResponse(Walk walk) {
        return new WalkResponse(
                walk.getId(),
                ElderlyMapper.toResponse(walk.getElderly()),
                VolunteerMapper.toResponse(walk.getVolunteer()),
                walk.getWalkDate(),
                walk.getDurationMinutes(),
                walk.getDistanceKm(),
                walk.getPainMood(),
                walk.getNotes());
    }
}
