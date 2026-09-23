package nl.wandelmaatje.mapper;

import nl.wandelmaatje.dto.VolunteerRequest;
import nl.wandelmaatje.dto.VolunteerResponse;
import nl.wandelmaatje.entity.Volunteer;

public final class VolunteerMapper {

    private VolunteerMapper() {
    }

    public static Volunteer toEntity(VolunteerRequest request) {
        Volunteer volunteer = new Volunteer();
        volunteer.setName(request.name());
        return volunteer;
    }

    public static VolunteerResponse toResponse(Volunteer volunteer) {
        return new VolunteerResponse(volunteer.getId(), volunteer.getName());
    }
}
